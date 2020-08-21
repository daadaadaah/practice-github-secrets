Feature('Home');

Scenario('프로젝트 이름이 보인다.', (I) => {
  I.amOnPage('/');

  I.see('Github 로그인 테스트');
});
