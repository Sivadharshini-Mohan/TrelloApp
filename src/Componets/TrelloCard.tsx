import Card from "react-bootstrap/Card";
import Status from "./Status";

interface ICardProps {
  children?: React.ReactNode;
  data: {
    id: number;
    uuid: string;
    title: string;
    subtitle: string;
    updatedAt: string;
  };
}

const TrelloCard = ({ data, status }: any) => {
  return (
    <Card className="w-100 m-auto" style={{ width: "100%" }}>
      <div className="d-flex">
        <p className="fw-bold px-2">Task:</p><p className="text-dark  fs-0 px-2">{data.task}</p>
      </div>
      <div className="d-flex">
        <p className="fw-bold px-2">Assigned To:</p><p className="text-dark  fs-0 px-2">{data.userName}</p>
      </div>
      <div className="d-flex">
        <p className="fw-bold px-2">Description:</p><p className="text-dark  fs-0 px-2">{data.description}</p>
      </div>
      <div className="d-flex">
        <p className="fw-bold px-2">Target Date:</p><Status status={status} data={data} />
      </div>
    </Card>
  );
};

export default TrelloCard;