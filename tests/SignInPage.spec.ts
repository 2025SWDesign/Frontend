import { test, expect } from "@playwright/test";

test.describe("all", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    // baseURL은 playwright.config.ts에서 설정되어 있다면 생략 가능
    await page.goto(baseURL ?? "http://localhost:5173");
  });

  test("초기 화면에 카카오/이메일 로그인 버튼이 보인다", async ({ page }) => {
    // KakaoButton, EmailButton 모두 <div>라 getByRole로 안잡히므로 getByText로 찾습니다.
    await expect(page.getByText("카카오 로그인")).toBeVisible();
    await expect(page.getByText("이메일로 로그인")).toBeVisible();
  });

  test("이메일 로그인으로 전환하면 입력 폼이 나타난다", async ({ page }) => {
    // 이메일 로그인 토글 클릭
    await page.getByText("이메일로 로그인").click();

    // 입력 폼 요소들
    await expect(page.getByPlaceholder("학교명을 검색하세요")).toBeVisible();
    await expect(page.getByPlaceholder("아이디를 입력하세요")).toBeVisible();
    await expect(page.getByPlaceholder("비밀번호를 입력하세요")).toBeVisible();
    // 실제 로그인 버튼(SignButton 은 <button> 이므로 getByRole 사용 가능)
    await expect(page.getByRole("button", { name: "로그인" })).toBeVisible();
  });

  test("학교를 선택하지 않고 로그인 시도하면 경고 다이얼로그가 뜬다", async ({
    page,
  }) => {
    // 이메일 로그인 모드로 전환
    await page.getByText("이메일로 로그인").click();

    // dialog 이벤트 리스너 등록
    page.once("dialog", async (dialog) => {
      expect(dialog.message()).toContain(
        "학교명을 검색 후 리스트에서 선택해주세요"
      );
      await dialog.accept();
    });

    // 로그인 버튼 클릭 (alert 발생)
    await page.getByRole("button", { name: "로그인" }).click();
  });

  test("올바른 자격증명으로 로그인 시 메인 페이지로 이동", async ({ page }) => {
    // 1) 학교 검색 API 목(mock) 응답
    await page.route("**/api/v1/school**", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          status: 200,
          data: [{ schoolId: 123, schoolName: "인천중학교" }],
        }),
      })
    );

    // 2) 로그인 API 목(mock) 응답
    await page.route("**/api/v1/auth/sign-in", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          status: 200,
          data: {
            accessToken: "fake-token",
            refreshToken: "fake-refresh",
            schoolId: 123,
            classId: null,
          },
        }),
      })
    );

    // 3) 이메일 로그인 모드로 전환
    await page.getByText("이메일로 로그인").click();

    // 4) 학교명 입력 & 선택
    await page.getByPlaceholder("학교명을 검색하세요").fill("인천중학교");
    // 디바운스 타이밍 감안
    await page.waitForTimeout(350);
    await page.getByText("인천중학교").click();

    // 5) 아이디/비번 입력
    await page
      .getByPlaceholder("아이디를 입력하세요")
      .fill("인천중학교110@naver.com");
    await page.getByPlaceholder("비밀번호를 입력하세요").fill("1");

    // 6) 로그인 버튼 클릭
    await page.getByRole("button", { name: "로그인" }).click();

    // 7) /main 으로 잘 이동했는지 확인
    await expect(page).toHaveURL(/\/main$/);
  });

  test("검색 결과에 보이는 모든 학교명에 '인천'이 포함되어야 한다", async ({
    page,
  }) => {
    // 이메일 로그인 폼으로 전환
    await page.getByText("이메일로 로그인").click();
  
    // 1) placeholder 기준으로 input 찾기
    const input = page.getByPlaceholder("학교명을 검색하세요");
    await expect(input).toBeVisible();
    await input.click();
    await input.fill("인천");
  
    // 2) API 응답 대기
    await page.waitForResponse(
      (resp) =>
        resp.status() === 200
    );
  
    // 3) 드롭다운 아이템들
    const items = page.locator("ul li");
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
  
    // 4) 모두 '인천' 포함
    for (let i = 0; i < count; i++) {
      await expect(items.nth(i)).toContainText("인천");
    }
  });
  
});


