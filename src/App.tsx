import { IconAdd } from "./Icon/icons/IconAdd";
import { IconEmail } from "./Icon/icons/IconEmail";
import { createFromIconfont } from "./Icon/createFromIconfont";

// 阿里图标库中 symbol 选项的在线链接
const IconFont = createFromIconfont(
  "//at.alicdn.com/t/c/font_4750890_cbj5c0r8ic.js"
);

function App() {
  return (
    <div style={{ padding: "50px" }}>
      <IconAdd size="40px"></IconAdd>
      <IconEmail spin></IconEmail>
      <IconEmail style={{ color: "blue", fontSize: "50px" }}></IconEmail>

      <IconFont type="icon-weixiu" size="40px"></IconFont>
    </div>
  );
}

export default App;
