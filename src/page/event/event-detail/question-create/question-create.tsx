import { Button, Modal } from '@ekidpro/ui';
import clsx from 'clsx';
import { Formik } from 'formik';
import { get } from 'lodash';
import { QuestionType } from 'types/question.type';
import { onCreateQuestion, onUpdateQuestion } from './question-create.action';
import { SelectCorrectAnswer } from './question-create.correct-answer';
import { InputField } from './question-create.input-field';
import { createQuestionSchema, initialValues } from './question-create.types';

interface QuestionCreateProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  data?: QuestionType;
}

export const QuestionCreate: React.FC<QuestionCreateProps> = (props) => {
  const { show, onClose, title, data } = props;
  // const refreshTable = useRefresh(PREFIX_QUESTION);

  return (
    <Modal title={title || 'TẠO CÂU HỎI'} show={show} onClose={onClose} size="md" zIndex={30}>
      <div className="my-5">
        <hr />
      </div>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={createQuestionSchema}
        onSubmit={(values, actions) => {
          if (!data?.id) {
            onCreateQuestion(values, actions)
              .then((response) => {
                if (get(response, 'success')) {
                  console.log('create success');
                }
              })
              .catch((err) => console.log(err));
          } else {
            onUpdateQuestion(values, actions, data.id)
              .then((response) => {
                if (get(response, 'success')) {
                  console.log('update success');
                }
              })
              .catch((err) => console.log(err));
          }
        }}
      >
        {({ handleSubmit, isSubmitting }) => {
          return (
            <div className="mt-10">
              <div className="md:px-5">
                <InputField field="question" title="Câu hỏi" inputType="textarea" />

                <InputField field="answer1" title="Câu trả lời A" />

                <InputField field="answer2" title="Câu trả lời B" />

                <InputField field="answer3" title="Câu trả lời C" />

                <InputField field="answer4" title="Câu trả lời D" />

                <SelectCorrectAnswer />
              </div>

              <div className="w-full grid grid-cols-3 gap-y-2 md:gap-y-2">
                <div className="col-span-4 md:col-span-1" />
                <div className="flex flex-col pt-4 col-span-4 md:col-span-4 relative">
                  <hr />
                  <div className="flex flex-row space-x-4 ml-auto mt-5">
                    <Button variant="secondary" className="ml-auto" onClick={onClose}>
                      Huỷ
                    </Button>
                    <Button
                      disabled={isSubmitting}
                      variant="primary"
                      type="submit"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      <div className="flex flex-row space-x-2 items-center">
                        <svg
                          className={clsx('animate-spin -ml-1 mr-3 h-5 w-5 text-white', { hidden: !isSubmitting })}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle className="opacity-25" cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={4} />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        {data?.id ? 'Cập nhật' : 'Tạo mới'}
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
    </Modal>
  );
};
