import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  CounselingContainer,
  CounselingHeader,
  Line,
  BoardTable,
  TableHeader,
  TableCell,
  TableRow,
  TitleCell,
  Pagination,
  PageButton,
  Footer,
  SearchContainer,
  SearchSelect,
  SearchInput,
  SearchButton,
  WriteButton,
  GuideMessage,
} from "./CounselingPage.styled";

interface Student {
  name: string;
  grade: number;
  class: number;
  number: number;
  img: string;
}

interface CounselingPageProps {
  identity: string;
  isHomeroom: boolean;
  selectedStudent: Student | null;
}

interface Post {
  id: number;
  title: string;
  author: string;
  subject: string;
  counselingDate: string;
  content: string;
  isPrivate: boolean;
  nextCounselingDate: string;
}

const CounselingPage: React.FC<CounselingPageProps> = ({
  identity,
  //isHomeroom,
  selectedStudent,
}) => {
  const navigate = useNavigate();
  const posts: Post[] = [
    {
      id: 1,
      title: "수학 상담 요청",
      author: "김철수",
      subject: "수학",
      counselingDate: "2025-04-01",
      content:
        "삼각함수 개념이 어려워서 도움이 필요합니다. 특히 사인, 코사인, 탄젠트의 관계를 이해하는 데 어려움이 있어요. 상담 시간에 자세히 설명해주실 수 있을까요?",
      isPrivate: false,
      nextCounselingDate: "2025-04-08",
    },
    {
      id: 2,
      title: "영어 과제 질문",
      author: "이영희",
      subject: "영어",
      counselingDate: "2025-04-02",
      content:
        "영어 에세이 작성법에 대해 도움이 필요합니다. 특히 논리적 구조와 인용 방법에 대해 상담 받고 싶어요. 제출 기한이 다가오고 있어서 빠른 상담 부탁드립니다.",
      isPrivate: false,
      nextCounselingDate: "2025-04-09",
    },
    {
      id: 3,
      title: "과학 실험 도움",
      author: "박민수",
      subject: "과학",
      counselingDate: "2025-04-03",
      content:
        "식물 성장 실험을 진행하고 있는데, 데이터 분석 방법이 어려워요. 그래프 작성과 결과 해석에 도움이 필요합니다. 실험 결과 데이터도 함께 가져갈 예정입니다.",
      isPrivate: false,
      nextCounselingDate: "2025-04-10",
    },
    {
      id: 4,
      title: "국어 시험 준비",
      author: "최지영",
      subject: "국어",
      counselingDate: "2025-04-04",
      content:
        "문학 작품 분석 방법에 대해 상담 받고 싶습니다. 특히 시와 소설의 주제 파악과 인물 분석에 어려움이 있어요. 다음 주 시험을 위한 효과적인 공부 방법도 알려주세요.",
      isPrivate: false,
      nextCounselingDate: "2025-04-11",
    },
    {
      id: 5,
      title: "역사 퀴즈 질문",
      author: "정현우",
      subject: "역사",
      counselingDate: "2025-04-05",
      content:
        "고려시대와 조선시대의 주요 정치 제도 차이점에 대해 헷갈리는 부분이 있어요. 특히 과거제도와 관료제도의 변화에 대해 자세히 알고 싶습니다. 다음 주 퀴즈 준비를 위한 조언도 부탁드립니다.",
      isPrivate: false,
      nextCounselingDate: "2025-04-12",
    },
    {
      id: 6,
      title: "미술 과제 상담",
      author: "김미영",
      subject: "미술",
      counselingDate: "2025-04-06",
      content:
        "원근법을 활용한 풍경화 그리기 과제가 있는데, 소실점 설정과 비례 조절이 어려워요. 제 스케치를 가져갈 테니 조언 부탁드립니다. 수채화 기법에 대한 팁도 듣고 싶어요.",
      isPrivate: false,
      nextCounselingDate: "2025-04-13",
    },
    {
      id: 7,
      title: "체육 훈련 계획",
      author: "이준호",
      subject: "체육",
      counselingDate: "2025-04-07",
      content:
        "교내 육상 대회를 준비하고 있는데, 단거리 달리기와 멀리뛰기 기록 향상을 위한 효율적인 훈련 계획을 세우고 싶습니다. 현재 훈련 계획을 검토해주시고 조언 부탁드립니다.",
      isPrivate: false,
      nextCounselingDate: "2025-04-14",
    },
    {
      id: 8,
      title: "음악 연습 도움",
      author: "한서연",
      subject: "음악",
      counselingDate: "2025-04-08",
      content:
        "피아노 연주 중 화음 전환이 매끄럽지 못한 문제가 있어요. 특히 베토벤 '월광 소나타' 3악장에서 어려움을 겪고 있습니다. 효과적인 연습 방법과 손가락 포지션에 대한 조언이 필요해요.",
      isPrivate: false,
      nextCounselingDate: "2025-04-15",
    },
    {
      id: 9,
      title: "컴퓨터 코딩 질문",
      author: "오태영",
      subject: "컴퓨터",
      counselingDate: "2025-04-09",
      content:
        "자바스크립트로 웹 애플리케이션을 개발하는 중인데, 비동기 함수와 프로미스 개념이 어려워요. 특히 API 데이터를 가져오는 부분에서 문제가 발생합니다. 코드 리뷰와 함께 설명 부탁드립니다.",
      isPrivate: false,
      nextCounselingDate: "2025-04-16",
    },
    {
      id: 10,
      title: "사회 토론 준비",
      author: "윤소희",
      subject: "사회",
      counselingDate: "2025-04-10",
      content:
        "환경 문제에 관한 토론 대회 준비 중입니다. 기후 변화에 대한 국제적 대응 전략에 관한 자료 조사와 효과적인 논점 구성에 도움이 필요해요. 반박 논리 구성에 대한 조언도 부탁드립니다.",
      isPrivate: false,
      nextCounselingDate: "2025-04-17",
    },
    {
      id: 11,
      title: "수학 복습 요청",
      author: "김철수",
      subject: "수학",
      counselingDate: "2025-04-11",
      content:
        "미적분 기초 개념에 대한 복습이 필요합니다. 특히 도함수 개념과 응용 문제 해결에 어려움이 있어요. 지난번 상담에서 배운 삼각함수와 연계된 부분도 다시 설명해주시면 감사하겠습니다.",
      isPrivate: false,
      nextCounselingDate: "2025-04-18",
    },
    {
      id: 12,
      title: "영어 회화 연습",
      author: "이영희",
      subject: "영어",
      counselingDate: "2025-04-12",
      content:
        "영어 발표를 위한 회화 연습이 필요합니다. 발음과 억양에 자신이 없어서 실전처럼 연습하고 피드백을 받고 싶어요. 준비한 발표 원고를 가져갈 예정이니 검토도 부탁드립니다.",
      isPrivate: false,
      nextCounselingDate: "2025-04-19",
    },
    {
      id: 13,
      title: "과학 프로젝트",
      author: "박민수",
      subject: "과학",
      counselingDate: "2025-04-13",
      content:
        "재생 에너지를 주제로 한 과학 프로젝트를 진행 중입니다. 태양광 패널의 효율성 측정 실험 설계에 어려움이 있어요. 실험 방법론과 데이터 수집 계획에 대한 조언이 필요합니다.",
      isPrivate: false,
      nextCounselingDate: "2025-04-20",
    },
    {
      id: 14,
      title: "국어 작문 도움",
      author: "최지영",
      subject: "국어",
      counselingDate: "2025-04-14",
      content:
        "설득력 있는 논술문 작성법에 대해 상담 받고 싶습니다. 주장과 근거의 논리적 연결이 약하다는 피드백을 받았어요. 제가 작성한 논술문을 가져갈 테니 구체적인 개선 방향을 알려주세요.",
      isPrivate: false,
      nextCounselingDate: "2025-04-21",
    },
    {
      id: 15,
      title: "역사 발표 준비",
      author: "정현우",
      subject: "역사",
      counselingDate: "2025-04-15",
      content:
        "한국 근현대사 발표를 준비하고 있습니다. 일제강점기부터 한국전쟁까지의 주요 사건들을 효과적으로 요약하는 방법과 흥미로운 발표 구성에 대한 조언이 필요해요. 발표 자료도 검토해주세요.",
      isPrivate: false,
      nextCounselingDate: "2025-04-22",
    },
    {
      id: 16,
      title: "미술 전시 질문",
      author: "김미영",
      subject: "미술",
      counselingDate: "2025-04-16",
      content:
        "학교 미술 전시회를 위한 작품 배치와 전시 기획에 대한 조언이 필요합니다. 다양한 매체와 크기의 작품들을 어떻게 조화롭게 배치할지, 주제를 효과적으로 전달하는 방법에 대해 상담 받고 싶어요.",
      isPrivate: false,
      nextCounselingDate: "2025-04-23",
    },
    {
      id: 17,
      title: "체육 경기 계획",
      author: "이준호",
      subject: "체육",
      counselingDate: "2025-04-17",
      content:
        "교내 농구 대회 전략을 세우고 있습니다. 우리 팀의 강점인 속공을 살리면서도 수비 약점을 보완할 수 있는 전술과 포메이션에 대해 조언을 구하고 싶어요. 경기 전 효과적인 워밍업 방법도 알려주세요.",
      isPrivate: false,
      nextCounselingDate: "2025-04-24",
    },
    {
      id: 18,
      title: "음악 작곡 도움",
      author: "한서연",
      subject: "음악",
      counselingDate: "2025-04-18",
      content:
        "간단한 피아노 소품을 작곡하고 있는데, 화성 진행과 구조 설계에 어려움이 있습니다. 작곡한 초안을 가져갈 테니 리듬과 멜로디 발전 방향에 대한 조언을 부탁드립니다.",
      isPrivate: false,
      nextCounselingDate: "2025-04-25",
    },
    {
      id: 19,
      title: "컴퓨터 디버깅",
      author: "오태영",
      subject: "컴퓨터",
      counselingDate: "2025-04-19",
      content:
        "개발 중인 앱에서 데이터베이스 연동 오류가 발생하고 있습니다. SQL 쿼리 최적화와 오류 처리 방법에 대해 상담 받고 싶어요. 문제가 되는 코드를 가져갈 예정이니 함께 디버깅해주세요.",
      isPrivate: false,
      nextCounselingDate: "2025-04-26",
    },
    {
      id: 20,
      title: "사회 조사 준비",
      author: "윤소희",
      subject: "사회",
      counselingDate: "2025-04-20",
      content:
        "지역 사회 문제에 관한 설문 조사를 계획하고 있습니다. 설문지 설계와 표본 추출 방법, 그리고 결과 분석 방법에 대한 조언이 필요해요. 초안 설문지를 가져갈 테니 검토 부탁드립니다.",
      isPrivate: false,
      nextCounselingDate: "2025-04-27",
    },
  ];

  // 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const [searchType, setSearchType] = useState("title"); // 검색 종류
  const [searchQuery, setSearchQuery] = useState(""); // 검색어
  const postsPerPage = 10;

  // 검색 필터링
  const filteredPosts = posts.filter((post) => {
    if (!searchQuery) return true;
    switch (searchType) {
      case "title":
        return post.title.toLowerCase().includes(searchQuery.toLowerCase());
      case "author":
        return post.author.toLowerCase().includes(searchQuery.toLowerCase());
      case "subject":
        return post.subject.toLowerCase().includes(searchQuery.toLowerCase());
      default:
        return true;
    }
  });

  // 현재 페이지 데이터 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // 핸들러
  const handleRowClick = (id: number) => {
    // 클릭한 id에 해당하는 게시물 찾기
    const selectedPost = posts.find((post) => post.id === id);

    if (selectedPost) {
      navigate("/counseling/write", {
        state: { post: selectedPost, viewOnly: true },
      });

      console.log(`게시물 ${id}로 이동, 데이터 전달:`, selectedPost);
    } else {
      console.error(`ID ${id}에 해당하는 게시물을 찾을 수 없습니다.`);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
    console.log(`검색: ${searchType} - ${searchQuery}`);
  };

  const handleWrite = () => {
    console.log("글 작성 페이지로 이동");
    navigate("/counseling/write");
  };

  return (
    <CounselingContainer>
      <CounselingHeader>상담 내역</CounselingHeader>
      <Line />
      {selectedStudent || !(identity == "teacher") ? (
        <>
          <BoardTable>
            <thead>
              <TableRow>
                <TableHeader width="3rem">번호</TableHeader>
                <TableHeader width="40rem">제목</TableHeader>
                <TableHeader width="10rem">작성자</TableHeader>
                <TableHeader width="5rem">담당과목</TableHeader>
                <TableHeader width="13rem">상담일자</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {currentPosts.map((post) => (
                <TableRow key={post.id} onClick={() => handleRowClick(post.id)}>
                  <TableCell isBold>{post.id}</TableCell>
                  <TitleCell>{post.title}</TitleCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{post.subject}</TableCell>
                  <TableCell>{post.counselingDate}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </BoardTable>
          <Footer>
            <SearchContainer>
              <SearchSelect
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="title">제목</option>
                <option value="author">작성자</option>
                <option value="subject">담당과목</option>
              </SearchSelect>
              <SearchInput
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="검색할 내용을 입력하세요。"
              />
              <SearchButton onClick={handleSearch}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9.5 16C7.68333 16 6.146 15.3707 4.888 14.112C3.63 12.8533 3.00067 11.316 3 9.5C2.99933 7.684 3.62867 6.14667 4.888 4.888C6.14733 3.62933 7.68467 3 9.5 3C11.3153 3 12.853 3.62933 14.113 4.888C15.373 6.14667 16.002 7.684 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L20.3 18.9C20.4833 19.0833 20.575 19.3167 20.575 19.6C20.575 19.8833 20.4833 20.1167 20.3 20.3C20.1167 20.4833 19.8833 20.575 19.6 20.575C19.3167 20.575 19.0833 20.4833 18.9 20.3L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16ZM9.5 14C10.75 14 11.8127 13.5627 12.688 12.688C13.5633 11.8133 14.0007 10.7507 14 9.5C13.9993 8.24933 13.562 7.187 12.688 6.313C11.814 5.439 10.7513 5.00133 9.5 5C8.24867 4.99867 7.18633 5.43633 6.313 6.313C5.43967 7.18967 5.002 8.252 5 9.5C4.998 10.748 5.43567 11.8107 6.313 12.688C7.19033 13.5653 8.25267 14.0027 9.5 14Z"
                    fill="white"
                  />
                </svg>
              </SearchButton>
            </SearchContainer>
            {identity === "teacher" && (
              <WriteButton onClick={handleWrite}>글 작성</WriteButton>
            )}
          </Footer>
          <Pagination>
            <PageButton
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{ backgroundColor: "#919EAB", color: "white" }}
            >
              &lt;
            </PageButton>
            {Array.from({ length: totalPages }, (_, index) => (
              <PageButton
                key={index + 1}
                active={currentPage === index + 1}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PageButton>
            ))}
            <PageButton
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </PageButton>
          </Pagination>
        </>
      ) : (
        <GuideMessage>
          좌측 검색창에서 성적을 조회할 학생을 검색하세요.
        </GuideMessage>
      )}
    </CounselingContainer>
  );
};

export default CounselingPage;
