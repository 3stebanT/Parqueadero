import SidebarInicio from "./SidebarInicio";

function LayoutInicio({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <SidebarInicio />

      <div style={{ flex: 1, padding: "20px", background: "#f5f6fa" }}>
        {children}
      </div>
    </div>
  );
}

export default LayoutInicio;