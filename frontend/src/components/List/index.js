const List = ({data, className, render}) => {
  return (
    <div className={className}>{
      data.map(render)}
    </div>
  );
}

export default List;