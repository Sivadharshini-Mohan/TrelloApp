const Status = ({ data }: any) => {

  return (
    <div className="d-flex justify-content-between gap-1 px-2">
      <p> {data.date}</p>
    </div>
  );
};

export default Status;
