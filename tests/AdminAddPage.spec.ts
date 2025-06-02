// tests/AdminLayout.spec.ts
import { test, expect, Page } from "@playwright/test";

// 역할별 로그인 정보
const credentials = {
  admin: { id: "202500001", pw: "admin1234" },
};

async function loginAsAdmin(
  page: Page,
  baseURL: string | undefined,
) {
  const { id, pw } = credentials.admin;
  await page.goto(baseURL ?? "http://localhost:5173");
  await page.getByText("이메일로 로그인").click();

  const schoolInput = page.getByPlaceholder("학교명을 검색하세요");
  await expect(schoolInput).toBeVisible();
  await schoolInput.fill("인천");
  await page.waitForTimeout(350);
  await page.getByText("인천중학교").click();

  await page.getByPlaceholder("아이디를 입력하세요").fill(id);
  await page.getByPlaceholder("비밀번호를 입력하세요").fill(pw);
  await page.getByRole("button", { name: "로그인" }).click();
}

test.describe("admin", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAsAdmin(page, baseURL);
  });

  test("학생·교사 폼 렌더링 확인", async ({ page }) => {
    /* ---------- 학생 폼 ---------- */
    await expect(page.getByTestId("student-form")).toBeVisible();
    await expect(page.getByTestId("stu-name")).toBeVisible();
    await expect(page.getByTestId("stu-email")).toBeVisible();
    await expect(page.getByTestId("stu-grade")).toHaveValue("1"); // 기본값 1
    await expect(page.getByTestId("stu-phone")).toBeVisible();
    await expect(page.getByTestId("stu-address")).toBeVisible();
    await expect(page.getByTestId("stu-homephone")).toBeVisible();
    await expect(page.getByTestId("stu-submit")).toBeVisible();

    /* ---------- 교사 폼 ---------- */
    await expect(page.getByTestId("teacher-form")).toBeVisible();
    await expect(page.getByTestId("tch-name")).toBeVisible();
    await expect(page.getByTestId("tch-email")).toBeVisible();
    await expect(page.getByTestId("tch-subject")).toHaveValue("과학"); // 기본값 과학
    await expect(page.getByTestId("tch-submit")).toBeVisible();
  });

  test("학생 계정 생성 플로우", async ({ page }) => {
    // sign-up 요청 모킹
    await page.route("**/api/v1/auth/sign-up", async (route) => {
      await route.fulfill({ status: 201, body: "{}" });
    });

    await page.getByTestId("stu-name").fill("홍길동");
    await page.getByTestId("stu-email").fill("hong161@example.com");
    await page.getByTestId("stu-grade").fill("2");
    await page.getByTestId("stu-phone").fill("01012345679");
    await page.getByTestId("stu-address").fill("서울특별시 어딘가");
    await page.getByTestId("stu-homephone").fill("01021234567");

    const [dialog] = await Promise.all([
      page.waitForEvent("dialog"),
      page.keyboard.press("Enter"),
    ]);

    expect(dialog.message()).toContain("학생 계정이 생성되었습니다");
    await dialog.accept();
  });

  test("교사 계정 생성 플로우", async ({ page }) => {
    await page.route("**/api/v1/auth/sign-up", async (route) => {
      const body = await route.request().postDataJSON();
      expect(body.role).toBe("TEACHER");
      await route.fulfill({ status: 201, body: "{}" });
    });

    await page.getByTestId("tch-name").fill("최교사");
    await page.getByTestId("tch-email").fill("tchoi@example.com");
    await page.getByTestId("tch-subject").selectOption("수학");

    const [dialog] = await Promise.all([
      page.waitForEvent("dialog"),
      page.getByTestId("tch-submit").click(),
    ]);

    expect(dialog.message()).toContain("교사 계정이 생성되었습니다");
    await dialog.accept();
  });
});
