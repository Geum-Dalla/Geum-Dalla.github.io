interface FileTreeProps {
  isActive: boolean;
  Tree: any;
}

export default function FileTree({ isActive, Tree }: FileTreeProps) {
  return <div>컨텐츠</div>;
}
function Folder() {
  return <div></div>;
}
function File() {
  return <div></div>;
}

/*
// 1. 메인 컴포넌트 정의
const AccordionMain = ({ children }: { children: React.ReactNode }) => {
  return <div className="acc">{children}</div>;
};

// 2. 서브 컴포넌트들 정의
const AccordionItem = ({ children }: { children: React.ReactNode }) => { ... };
const AccordionTrigger = ({ children }: { children: React.ReactNode }) => { ... };
const AccordionContent = ({ children }: { children: React.ReactNode }) => { ... };

// 3. ★ 여기서 합체! (Object.assign 사용)
export const Accordion = Object.assign(AccordionMain, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});
*/
