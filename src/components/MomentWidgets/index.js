import React from "react";

function WidgetContainer(component) {
  if (!component) {
    return null;
  }

  const title = component.props && component.props.title;
  const key = component.key || title;
  const heading = title && <div className="panel-heading">{title}</div>;

  return (
    <div key={key} className="panel panel-default">
      {heading}
      <div className="panel-body">{component}</div>
    </div>
  );
}

export function MomentWidgets({ children }) {
  const content =
    React.Children.count(children) > 0 ? (
      React.Children.map(children, WidgetContainer)
    ) : (
      <p className="text-center text-muted">No Data Yet</p>
    );

  return (
    <div className="col-sm-6">
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {content}
      </div>
    </div>
  );
}
