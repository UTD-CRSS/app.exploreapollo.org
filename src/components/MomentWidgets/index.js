import React from "react";

function WidgetContainer(component) {
  if (!component) {return null;}

  const title = component.props && component.props.title;
  const key = component.key || title;
  const heading = title && (
      <div className="panel-heading">
        {title}
      </div>
    );

  return (<div key={key}
               className="panel panel-default">
    {heading}
    <div className="panel-body">
      {component}
    </div>
  </div>);
}

export default function MomentWidgets({children}) {
  const content = React.Children.count(children) > 0
    ? React.Children.map(children, WidgetContainer)
    : (<div className="alert alert-info">
      No Moment Information Yet.
    </div>);
  return (<div className="col-sm-6">
    {content}
  </div>);
}
