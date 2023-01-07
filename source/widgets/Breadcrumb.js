import { LcsLinkBtn } from "@/widgets/LcsLinkBtn";
import { BreadcrumbStyles, Icons } from "@/consts/style.consts";

export default function Breadcrumb({ content }) {
  return (
    <nav>
      <ol role="list" className={BreadcrumbStyles.root()}>
        {content.map((breadcrumb, index) => {
          return (
            <li key={breadcrumb.id}>
              <div className={BreadcrumbStyles.align()}>
                {content.length !== index + 1 ? (
                  <>
                    <LcsLinkBtn
                      href={breadcrumb.href}
                      content={breadcrumb.name}
                      className={BreadcrumbStyles.listFont()}
                    />
                    <Icons.BackSlash varient="black" />
                  </>
                ) : (
                  <>
                    {/* <LcsLinkBtn
                      href={breadcrumb.href}
                      content={breadcrumb.name}
                      className={BreadcrumbStyles.listFont()}
                    /> */}
                    {breadcrumb.name}
                  </>
                )}
              </div>
            </li>
          );
        })}
        <li className={BreadcrumbStyles.listDesc()}>
          {/* <LcsLinkBtn
            href={content.href}
            content={content.name}
            className={BreadcrumbStyles.linkHover()}
          /> */}
        </li>
      </ol>
    </nav>
  );
}
