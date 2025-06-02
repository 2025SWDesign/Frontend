import { test, expect } from "@playwright/test";

// 공통: 로그인 후 개인정보 모달 열기
async function loginAndOpenMyPage(
  page: any,
  baseURL: string | undefined,
  userId: string,
  password: string,
  needsStudentSelection = false,
  preSearchForTeacher = false
) {
  await page.goto(baseURL ?? "http://localhost:5173");
  await page.getByText("이메일로 로그인").click();
  const schoolInput = page.getByPlaceholder("학교명을 검색하세요");
  await expect(schoolInput).toBeVisible();
  await schoolInput.fill("인천");
  await page.waitForTimeout(350);
  await page.getByText("인천중학교").click();
  await page.getByPlaceholder("아이디를 입력하세요").fill(userId);
  await page.getByPlaceholder("비밀번호를 입력하세요").fill(password);
  await page.getByRole("button", { name: "로그인" }).click();

  if (preSearchForTeacher) {
    const studentSearchInput = page.getByTestId("student-search-input");
    await expect(studentSearchInput).toBeVisible();
    await studentSearchInput.fill("김민준");
    await page.getByTestId("search-button").click();
    await page.waitForSelector(
      '[data-testid="student-list"] tbody tr:has-text("김민준")',
      { state: "visible", timeout: 5000 }
    );
    await page.locator('[data-testid="student-list"] tbody tr').first().click();
  }

  if (needsStudentSelection) {
    await page.waitForSelector(
      '[data-testid="student-list"] tbody tr:has-text("김민준")',
      { state: "visible", timeout: 5000 }
    );
  }

  await page.getByTestId("user-icon").click();
  await page.getByText("개인정보").click();
  await expect(page.getByTestId("mypage-modal")).toBeVisible();
}

// 공통: 섹션 가시성 검증
async function verifySections(
  page: any,
  photoVisible: boolean,
  passwordVisible: boolean,
  kakaoVisible: boolean,
  parentVisible: boolean
) {
  if (photoVisible) {
    await expect(page.getByTestId("photo-section")).toBeVisible();
  } else {
    await expect(page.getByTestId("photo-section")).toBeHidden();
  }

  if (passwordVisible) {
    await expect(page.getByTestId("password-section")).toBeVisible();
  } else {
    await expect(page.getByTestId("password-section")).toBeHidden();
  }

  if (kakaoVisible) {
    await expect(page.getByTestId("kakao-button")).toBeVisible();
  } else {
    await expect(page.getByTestId("kakao-button")).toBeHidden();
  }

  if (parentVisible) {
    await expect(page.getByTestId("parent-section")).toBeVisible();
  } else {
    await expect(page.getByTestId("parent-section")).toBeHidden();
  }
}

// 공통: 빈 비밀번호 오류 검증
async function verifyPasswordError(page: any) {
  await page.getByTestId("password-change-button").click();
  await expect(page.getByTestId("password-error")).toBeVisible();
}

// 공통: 비밀번호 토글 검증
async function verifyPasswordToggle(page: any) {
  const current = page.getByTestId("input-current-password");
  await expect(current).toHaveAttribute("type", "password");
  await page.getByTestId("password-toggle-visibility").click();
  await expect(current).toHaveAttribute("type", "text");
}

// — homeroom teacher —
test.describe("homeroom teacher", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndOpenMyPage(
      page,
      baseURL,
      "인천중학교110@naver.com",
      "1",
      true,
      false
    );
  });

  test("사진 변경 섹션과 학부모 계정 생성 섹션이 숨겨지고, 비밀번호 변경 섹션과 카카오 연동 버튼이 보여진다", async ({
    page,
  }) => {
    await verifySections(page, false, true, true, false);
  });

  test("빈 비밀번호 입력 후 변경 버튼 클릭 시 오류 메시지가 표시된다", async ({
    page,
  }) => {
    await verifyPasswordError(page);
  });

  test("비밀번호 표시 토글 클릭 시 입력 타입이 password→text 로 변경된다", async ({
    page,
  }) => {
    await verifyPasswordToggle(page);
  });
});

// — teacher —
test.describe("teacher", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndOpenMyPage(page, baseURL, "202500081", "893054", false, false);
  });

  test("사진 변경 섹션과 학부모 계정 생성 섹션이 숨겨지고, 비밀번호 변경 섹션과 카카오 연동 버튼이 보여진다", async ({
    page,
  }) => {
    await verifySections(page, false, true, true, false);
  });

  test("빈 비밀번호 입력 후 변경 버튼 클릭 시 오류 메시지가 표시된다", async ({
    page,
  }) => {
    await verifyPasswordError(page);
  });

  test("비밀번호 표시 토글 클릭 시 입력 타입이 password→text 로 변경된다", async ({
    page,
  }) => {
    await verifyPasswordToggle(page);
  });
});

// — parent —
test.describe("parent", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndOpenMyPage(page, baseURL, "202500025p", "rlaalswns", false, false);
  });

  test("사진 변경 섹션과 학부모 계정 생성 섹션이 숨겨지고, 비밀번호 변경 섹션과 카카오 연동 버튼이 보여진다", async ({
    page,
  }) => {
    await verifySections(page, false, true, true, false);
  });

  test("빈 비밀번호 입력 후 변경 버튼 클릭 시 오류 메시지가 표시된다", async ({
    page,
  }) => {
    await verifyPasswordError(page);
  });

  test("비밀번호 표시 토글 클릭 시 입력 타입이 password→text 로 변경된다", async ({
    page,
  }) => {
    await verifyPasswordToggle(page);
  });
});

// — student —
test.describe("student", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAndOpenMyPage(page, baseURL, "202500025", "1", false, false);
  });

  test("사진 변경 섹션과 학부모 계정 생성 섹션, 비밀번호 변경 섹션, 카카오 연동 버튼이 보여진다", async ({
    page,
  }) => {
    await verifySections(page, true, true, true, true);
  });

  test("빈 비밀번호 입력 후 변경 버튼 클릭 시 오류 메시지가 표시된다", async ({
    page,
  }) => {
    await verifyPasswordError(page);
  });

  test("비밀번호 표시 토글 클릭 시 입력 타입이 password→text 로 변경된다", async ({
    page,
  }) => {
    await verifyPasswordToggle(page);
  });
});
