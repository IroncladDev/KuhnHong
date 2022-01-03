export default function Path(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio={props.ratio||"none"} className={props.classes} viewbox={props.viewbox||"0 0 800 600"}>
      <path d={props.path} fill={props.fill} />
    </svg>
  );
}