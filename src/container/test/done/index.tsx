import { Body2, Title2 } from '@/components/common/Typography';
import $ from './done.module.scss';
import classNames from 'classnames';
import KakaoShareButton from '@/components/common/KakaoShareButton';
import Button from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';
import { AnimateClap } from '@/components/common/TossFace';
import { useToast } from '@/hooks/useToast';

interface TestCompletedProps {
  nickname: string;
  quizid: number;
}

function TestCompletedLayout({ nickname, quizid }: TestCompletedProps) {
  const navigate = useNavigate();
  const { addToasts } = useToast();


  //링크 복사
  const handleCopy = async () => {
    const shareURL = `${window.location.origin}/grading/${quizid}`;    

    try {
      await navigator.clipboard.writeText(shareURL);
      addToasts('클립보드에 링크가 복사되었습니다.', { bottom: '220px'});
    } catch (error) {
      console.error('클립보드 복사 실패:', error);
    }
  };

  //처음으로 돌아가기
  const handleReset = () => {
    navigate('/main');
  };

  return (
    <div className={classNames($.Wrapper)}>
      <div className={classNames($.Container)}>
        <img src={AnimateClap} alt="박수 이미지" />

        <Title2>문제를 다 풀었어요!</Title2>
        <Body2>
          답안지를 {nickname}에게 보내서
          <br /> 채점을 받아볼까요?
        </Body2>
      </div>

      <div className={classNames($.ButtonContainer)}>
        <KakaoShareButton variant="grading" quizid={quizid}/>
        <Button variant="secondary" onClick={handleCopy}>
          링크 복사
        </Button>
      </div>

      <Button variant="primary" onClick={handleReset}>
        처음으로 돌아가기
      </Button>
    </div>
  );
}

export default TestCompletedLayout;

