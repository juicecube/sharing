describe('test search page', () => {
  
  // 几个 route 路径变量
  const searchRoutePath = '/api/items/activities?query=*';
  const deleteActivityRoutePath = '/api/activities/*/items/batch?num_iids[]=*';
  const undoActivityRoutePath = '/api/activities/*/items/undo';

  function search(keyword) {
      // 将搜索行为和等待搜索返回封装起来
      cy
          .fixture('items/activities.json')
          // 处理mock数据，只返回符合搜索结构的数据
          .then(data => data.filter(item => item.title.indexOf(keyword) !== -1))
          .as('searchResult');
      cy.server();
      cy.route(searchRoutePath, '@searchResult').as('searchRoute');

      const input = cy.get('input');
      input.clear(); // 清空输入框内文本

      input.type(`${keyword}{enter}`);

      cy.wait('@searchRoute');
  }

  before(() => {
      // 进行所有测试前，先访问搜索页
      cy.visit('/activities/search');
  });

  it('should show no data tip when search result is empty', () => {
      const text = 'not exist';
      search(text);
      cy.contains(`没有找到关于 ${text} 的结果`);
  });

  it('should remove activity from list when clean successful', () => {
      search('成功');

      cy
          .route('delete', deleteActivityRoutePath, {
              success: 0,
              fail: 0,
              waiting: 0,
          })
          .as('deleteActivityResponse');

      // within是让cy执行的context保持在'.activities-search'这个dom节点内
      // 默认cy的执行是以上一个cy命令结果作为context
      // 如 "cy.get('a'); cy.get('span')"，cy会在上一个命令找到的'a'标签中查找'span'
      cy.get('.activities-search').within(() => {
          const items = cy.get('.result-item');
          items.should('have.length', 1);
          const applyList = items.get('.apply-list');

          applyList.should('not.be.visible'); // 每个数据项内详细内容区域是隐藏的

          const toggleBtn = items.get('.item-apply-count');
          toggleBtn.click(); // 点击显示详细内容区
          applyList.should('be.visible');
          applyList.children().should('have.length', 1); // 详细内容区内数据只有1条

          const cleanBtn = cy.contains('退出');
          cleanBtn.click(); // 点击详细内容区里的“退出”按钮

          cy.wait('@deleteActivityResponse'); // 等待“退出”请求返回
          cy.get('.apply-list').should('be', null); // 退出成功后，详细内容区数据减1，即空
      });
  });
});
