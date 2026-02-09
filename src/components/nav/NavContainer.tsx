import NavigationProvider from "@/components/nav/NavigationProvider";

// 이곳에서 버튼들을 import 해와서 직접 뿌려주기
import Home from "@/components/nav/navItems/Home";
import Article from "@/components/nav/navItems/article/Container";

export default function NavContainer() {
  return (
    <NavigationProvider>
      <Home></Home>
      <Article></Article>
    </NavigationProvider>
  );
}
