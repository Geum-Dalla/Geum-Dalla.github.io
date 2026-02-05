목표
Nav의 특정 버튼을 "Article Root"로 사용해서, 버튼을 누르면 블로그 글 트리 뷰어 UI로 진입.
레포 내부의 실제 폴더 + .md 파일 구조를 반영한 트리 데이터를 만들고, 이를 기반으로 폴더/파일을 탐색해서 글을 선택하면 뷰어 영역에 렌더링.
구현은 사용자가 맡고, 여기서는 폴더 구조 설계, 컴포넌트 구조, 상태/라우팅 전략을 구체적으로 정의.

1. 정보 구조 & 데이터 모델 설계
   폴더 구조 규칙 정의
   `[contentRoot]/articles 같은 루트 폴더 하나를 정해, 그 하위에 **주제별 폴더/서브폴더와 `.md 파일\*\*을 배치.
   예시: `[project-root]/content/articles/RootTopic/FolderA/FileA1.md` 형태.
   트리 노드 타입 정의 (TypeScript 인터페이스)
   TreeNode (공통)
   id: string (경로 기반 유니크 ID)
   name: string (표시용 이름)
   path: string (루트 기준 상대 경로, 예: FolderB/SubFolderB1/FileB1.md)
   type: "folder" | "file"
   FolderNode extends TreeNode
   type: "folder"
   children: TreeNode[]
   FileNode extends TreeNode
   type: "file"
   meta?: { title?: string; date?: string; tags?: string[]; ... } (선택)
   트리 데이터 생성 전략 (Next App Router + fs 기반)
   서버 컴포넌트/서버 유틸에서 fs로 content/articles를 재귀 탐색해서 한 번에 트리 구조를 만들어 반환하는 함수를 설계.
   예: getArticleTree(): Promise<FolderNode>.
   각 파일 경로를 기준으로 슬러그 배열도 만들 수 있게 설계 (라우팅 연동을 위해).
2. 라우팅 & URL 설계 (Next.js App Router)
   기본 아이디어
   Nav 버튼은 단순히 특정 페이지/레이아웃으로 이동: 예) /articles.
   /articles 페이지는 좌측에 트리 네비게이션, 우측에 컨텐츠 뷰어가 있는 레이아웃.
   동적 경로로 특정 글 열기
   `/articles/[[...slug]]` 패턴으로 라우트 정의 (선택사항: 한 페이지에서 트리+뷰어 모두 관리하려면 유용).
   slug는 ['FolderB', 'SubFolderB1', 'FileB1'] 같은 배열.
   이 slug를 fs 경로(FolderB/SubFolderB1/FileB1.md)와 매핑해서 해당 MD 파일을 읽어 렌더.
   이렇게 하면 URL만 공유해도 같은 글을 바로 열 수 있고, 브라우저 히스토리/뒤로 가기 기능도 자연스럽게 동작.
   라우팅/상태 역할 분리
   URL(slug)는 "현재 어떤 파일을 보고 있는지"를 표현.
   리액트 상태는 트리 열림 상태(어떤 폴더가 펼쳐져 있는지)와 선택된 노드 하이라이트를 관리.
3. Nav 연동 설계 (ResponsiveNav → Articles)
   NavItem 매핑
   ResponsiveNav에서 하나의 NavItem을 Article Root 버튼으로 지정: 예) label="글" 또는 기존 항목 중 하나를 교체.
   이 버튼은 Next의 Link 혹은 useRouter().push("/articles")로 /articles 경로로 이동.
   아이콘/레이블 UX
   이 NavItem은 사용자가 "블로그 글 트리" 화면이라는 것을 직관적으로 알 수 있도록 폴더/문서 아이콘 조합 사용.
4. Articles 레이아웃 & UI 컴포넌트 구조
   상위 레이아웃 컴포넌트 (ArticlesLayout)
   구조: 좌측 트리 패널 + 우측 컨텐츠 패널 레이아웃.
   Next App Router에서는 `[articles]/layout.tsx 또는 `app/articles/layout.tsx에서 레이아웃 정의.
   트리 패널 컴포넌트 계층
   ArticleTreePanel
   props: tree: FolderNode, currentPath: string | null, onSelect(node: TreeNode).
   역할: 루트 폴더부터 재귀적으로 렌더.
   TreeNodeItem
   폴더/파일 공통 UI 컴포넌트.
   폴더일 때: 클릭 시 해당 폴더의 children을 토글(펼치기/접기).
   파일일 때: 클릭 시 해당 파일 경로에 맞는 URL로 이동.
   스타일/인터랙션
   들여쓰기(indentation)로 계층 표현.
   현재 선택된 파일은 강조 스타일.
   펼쳐진 폴더에는 caret 아이콘(▶/▼) or 폴더 오픈 아이콘.
   컨텐츠 패널 컴포넌트 계층
   ArticleViewer
   props: filePath: string | null, content: string | null, meta?: ArticleMeta.
   역할: 선택된 파일의 Markdown을 HTML로 렌더링.
   마크다운 렌더링은 프로젝트에서 사용하는 기존 마크다운 컴포넌트가 있다면 재사용하고, 없다면 remark/rehype 기반 렌더 컴포넌트 하나 설계.
5. 상태 관리 & 상호작용 플로우
   폴더 열림 상태 관리
   클라이언트 컴포넌트에서 openFolders: Set<string> 또는 문자열 배열로 관리 (각 폴더의 path를 키로).
   폴더 클릭 시: openFolders에 path를 추가/제거하고, 트리 리렌더.
   현재 선택된 파일이 속한 폴더 경로 체인은 초기 렌더 때 자동으로 열려 있도록 계산 (URL 기반).
   파일 선택 플로우 (버튼 → 폴더 탐색 → 파일 클릭)
   ResponsiveNav의 Article 버튼 클릭 → /articles로 이동.
   /articles 진입 시 getArticleTree()로 전체 트리 데이터 로드.
   사용자가 폴더 노드를 클릭 → openFolders 토글.
   사용자가 파일 노드를 클릭 → 해당 파일에 대응하는 slug로 router.push("/articles/...slug").
   URL이 바뀌면 서버 측에서 해당 MD 파일을 읽어 ArticleViewer에 props로 전달.
   동시에 클라이언트 측에서는 slug를 기준으로 선택된 파일 표시 + 폴더 자동 펼침.
6. 서버 유틸 설계 (트리/콘텐츠 로드)
   트리 생성 유틸
   위치: lib/articles/tree.ts (예시 경로).
   함수들:
   getArticleTree(): Promise<FolderNode>
   getArticleNodeBySlug(slug: string[]): Promise<FileNode | null> (선택)
   내부 구현:
   fs.readdirSync / fs.promises.readdir로 디렉토리 순회.
   폴더는 FolderNode로, .md 파일은 FileNode로 매핑.
   파일 이름에서 확장자 제거해서 name/슬러그로 사용.
   콘텐츠 로드 유틸
   위치: lib/articles/content.ts.
   함수들:
   getArticleContent(slug: string[]): Promise<{ content: string; meta?: ArticleMeta }>.
   내부 구현:
   slug 배열을 path.join으로 묶어 실제 .md 파일 경로 생성.
   fs.readFile로 내용을 읽어서 반환.
   필요하다면 gray-matter로 front-matter 파싱해 meta 구성.
7. UX 디테일 & 확장 포인트
   초기 상태 UX
   /articles에 slug가 없을 때는
   우측 뷰어에 "왼쪽에서 글을 선택하세요" 안내 문구.
   좌측 트리에서는 루트 폴더만 펼친 상태.
   키보드/접근성
   TreeNodeItem에 button/aria-expanded/aria-selected를 적절히 설정해 스크린 리더 친화적으로 설계.
   검색 기능(추후)
   트리 위에 간단한 검색 인풋을 두고
   제목/파일명 기준으로 필터링한 리스트를 보여주거나
   검색 결과를 클릭하면 해당 노드로 스크롤 & 하이라이트.
8. 단계별 구현 순서 제안
   1단계: 기본 라우팅 & Nav 연동
   `/articles/[[...slug]]` 페이지 생성.
   ResponsiveNav에서 Article 버튼 → /articles 이동만 먼저 연결.
   2단계: 서버 유틸 & 트리 데이터 준비
   content/articles 폴더 구조를 간단히 만들고, getArticleTree() 구현.
   페이지에서 이 트리 데이터를 받아 콘솔에 찍어보며 구조 확인.
   3단계: 트리 UI 컴포넌트 구현
   ArticleTreePanel, TreeNodeItem를 만들어 루트 ~ 2 depth 정도만 먼저 렌더.
   폴더 토글/파일 선택 이벤트 핸들링 추가.
   4단계: 파일 선택 → URL 연동 + 컨텐츠 뷰어
   파일 클릭 시 slug 기반 라우팅 구현.
   getArticleContent()를 만들어 선택된 파일을 Markdown 뷰어로 보여주기.
   5단계: UX 개선 & 리팩토링
   선택된 파일 하이라이트, 폴더 자동 펼침, 반응형 스타일 조정.
   타입 정리, 유틸 함수 분리, 필요시 캐싱/빌드 타임 프리렌더링.
