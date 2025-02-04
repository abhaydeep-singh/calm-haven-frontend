import React,{ useState,useEffect } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { addData } from "@/store/srqSlice";
import { useDispatch, useSelector } from "react-redux";
// src/components/SurveyComponent.js

const SurveyComponent = () => {
  const [answers, setAnswers] = useState({});
  const dispatch = useDispatch();
  const reduxSurveyData = useSelector((state) => state.srq.surveyData);
  

  const questions = [
    { id: 1, text: 'Do you often have headaches?' },
    { id: 2, text: 'Is your appetite poor?' },
    { id: 3, text: 'Do you sleep badly?' },
    { id: 4, text: 'Are you easily frightened?' },
    { id: 5, text: 'Do your hands shake?' },
    { id: 6, text: 'Do you feel nervous, tense or worried?' },
    { id: 7, text: 'Is your digestion poor?' },
    { id: 8, text: 'Do you have trouble thinking clearly?' },
    { id: 9, text: 'Do you feel unhappy?' },
    { id: 10, text: 'Do you cry more than usual?' },
    { id: 11, text: 'Do you find it difficult to enjoy your daily activities?' },
    { id: 12, text: 'Do you find it difficult to make decisions?' },
    { id: 13, text: 'Is your daily work suffering?' },
    { id: 14, text: 'Are you unable to play a useful part in life?' },
    { id: 15, text: 'Have you lost interest in things?' },
    { id: 16, text: 'Do you feel that you are a worthless person?' },
    { id: 17, text: 'Has the thought of ending your life been on your mind?' },
    { id: 18, text: 'Do you feel tired all the time?' },
    { id: 19, text: 'Do you have uncomfortable feelings in your stomach?' },
    { id: 20, text: 'Are you easily tired?' },
  ];

  const handleChange = (id, value) => {
    setAnswers({
      ...answers,
      [id]: value,
    });
  };

  useEffect(() => {
    console.log('redux data after:', reduxSurveyData);
  }, [reduxSurveyData]);


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('redux data before:', reduxSurveyData);
    dispatch(addData({surveyData: answers }));
    // console.log('redux data after :', reduxSurveyData);


  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 h-1/2">
      {questions.map((question) => (
        <div key={question.id} className="space-y-2">
          <p className="text-gray-700 text-xl">{question.text}</p>
          <RadioGroup
            value={answers[question.id] || ''}
            onValueChange={(value) => handleChange(question.id, value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id={`yes-${question.id}`} />
              <Label htmlFor={`yes-${question.id}`}>Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id={`no-${question.id}`} />
              <Label htmlFor={`no-${question.id}`}>No</Label>
            </div>
          </RadioGroup>
        </div>
      ))}
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Submit
      </button>
    </form>
  );
};

export default SurveyComponent;
