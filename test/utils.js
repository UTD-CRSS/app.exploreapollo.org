import {indexOf} from "lodash";

export function hasClass(component, ref, target) {
  const className = component.get(ref).getClassName();
  return className && indexOf(className.split(" "), target) > -1;
}
