import { QuestionType } from 'types/question.type';

export default function QuestionAction(data: QuestionType) {
  return (
    <div className="flex flex-row space-x-4">
      {/* <Link
        to={`/user/${data.id}`}
        className="bg-gray-100 hover:bg-blue-500 text-blue-500 hover:text-white duration-300 h-9 w-9 cursor-pointer text-center flex justify-center items-center rounded"
        title="Chi tiết"
      >
        <i className="fas fa-eye"></i>
      </Link> */}

      <div
        className="bg-gray-100 hover:bg-blue-500 text-blue-500 hover:text-white duration-300 h-9 w-9 cursor-pointer text-center flex justify-center items-center rounded"
        title="Cập nhật"
      >
        <i className="fas fa-edit"></i>
      </div>
    </div>
  );
}
