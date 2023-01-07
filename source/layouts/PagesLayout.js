import { PagesLayoutStyles } from "@/consts/style.consts";

export default function PagesLayout(props) {
  return (
    <div className={PagesLayoutStyles.root()}>
      <div className={PagesLayoutStyles.container()}>{props.children}</div>
    </div>
  );
}
