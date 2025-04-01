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
} from "./CounselingPage.styled";

interface Post {
  id: number;
  title: string;
  author: string;
  subject: string;
  counselingDate: string;
}

const CounselingPage: React.FC = () => {
  const navigate = useNavigate();
  const posts: Post[] = [
    {
      id: 1,
      title: "수학 상담 요청",
      author: "김철수",
      subject: "수학",
      counselingDate: "2025-04-01",
    },
    {
      id: 2,
      title: "영어 과제 질문",
      author: "이영희",
      subject: "영어",
      counselingDate: "2025-04-02",
    },
    {
      id: 3,
      title: "과학 실험 도움",
      author: "박민수",
      subject: "과학",
      counselingDate: "2025-04-03",
    },
    {
      id: 4,
      title: "국어 시험 준비",
      author: "최지영",
      subject: "국어",
      counselingDate: "2025-04-04",
    },
    {
      id: 5,
      title: "역사 퀴즈 질문",
      author: "정현우",
      subject: "역사",
      counselingDate: "2025-04-05",
    },
    {
      id: 6,
      title: "미술 과제 상담",
      author: "김미영",
      subject: "미술",
      counselingDate: "2025-04-06",
    },
    {
      id: 7,
      title: "체육 훈련 계획",
      author: "이준호",
      subject: "체육",
      counselingDate: "2025-04-07",
    },
    {
      id: 8,
      title: "음악 연습 도움",
      author: "한서연",
      subject: "음악",
      counselingDate: "2025-04-08",
    },
    {
      id: 9,
      title: "컴퓨터 코딩 질문",
      author: "오태영",
      subject: "컴퓨터",
      counselingDate: "2025-04-09",
    },
    {
      id: 10,
      title: "사회 토론 준비",
      author: "윤소희",
      subject: "사회",
      counselingDate: "2025-04-10",
    },
    {
      id: 11,
      title: "수학 복습 요청",
      author: "김철수",
      subject: "수학",
      counselingDate: "2025-04-11",
    },
    {
      id: 12,
      title: "영어 회화 연습",
      author: "이영희",
      subject: "영어",
      counselingDate: "2025-04-12",
    },
    {
      id: 13,
      title: "과학 프로젝트",
      author: "박민수",
      subject: "과학",
      counselingDate: "2025-04-13",
    },
    {
      id: 14,
      title: "국어 작문 도움",
      author: "최지영",
      subject: "국어",
      counselingDate: "2025-04-14",
    },
    {
      id: 15,
      title: "역사 발표 준비",
      author: "정현우",
      subject: "역사",
      counselingDate: "2025-04-15",
    },
    {
      id: 16,
      title: "미술 전시 질문",
      author: "김미영",
      subject: "미술",
      counselingDate: "2025-04-16",
    },
    {
      id: 17,
      title: "체육 경기 계획",
      author: "이준호",
      subject: "체육",
      counselingDate: "2025-04-17",
    },
    {
      id: 18,
      title: "음악 작곡 도움",
      author: "한서연",
      subject: "음악",
      counselingDate: "2025-04-18",
    },
    {
      id: 19,
      title: "컴퓨터 디버깅",
      author: "오태영",
      subject: "컴퓨터",
      counselingDate: "2025-04-19",
    },
    {
      id: 20,
      title: "사회 조사 준비",
      author: "윤소희",
      subject: "사회",
      counselingDate: "2025-04-20",
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
    console.log(`게시물 ${id}로 이동`);
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
          <SearchButton onClick={handleSearch}></SearchButton>
        </SearchContainer>
        <WriteButton onClick={handleWrite}>글 작성</WriteButton>
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
    </CounselingContainer>
  );
};

export default CounselingPage;
