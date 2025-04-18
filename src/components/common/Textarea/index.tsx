import classNames from 'classnames';
import { ChangeEvent, useEffect, useState, useRef, SetStateAction, Dispatch } from 'react';
import $ from '@/components/common/Textarea/textarea.module.scss';
import X from '@/assets/svg/X.svg?react';
import { Body3 } from '@/components/common/Typography';

interface TextareaProps {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  maxLength?: number;
  inputMode?: 'text' | 'numeric';
  showCounter?: boolean;
}

export default function Textarea({ text, setText, maxLength, inputMode, showCounter }: TextareaProps) {
  const [isTyping, setIsTyping] = useState<boolean>(false);
  //textarea을 focus하기 위해 useRef 사용(handleClear 실행 이후에도 포커스가 유지되도록)
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  //div 밖 영역 감지를 위해
  const textareaWrapperRef = useRef<HTMLDivElement>(null);


  // 장문 입력 시 textarea 높이를 자동으로 조절함 
  const handleResizeHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  // 입력이 변경될 때마다 높이 조절
  useEffect(() => {
    handleResizeHeight();
  }, [text]);

  const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (!maxLength || newValue.length <= maxLength) {
      setText(newValue);
    }
  };

  const handleClear = () => {
    setText('');
    textareaRef.current?.focus();
  };

  useEffect(() => {
    if (text == '') {
      setIsTyping(false);
    } else {
      setIsTyping(true);
    }
  }, [text]);

  useEffect(() => {
    const handleTextareaDivOutside = (event: MouseEvent | TouchEvent) => {
      if (
        textareaWrapperRef.current && 
        !textareaWrapperRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('button') // 탭한 곳이 버튼인 경우는 제외
      ) {
        setIsTyping(false);
        textareaRef.current?.blur();
      }
    };

    document.addEventListener('mousedown', handleTextareaDivOutside);
    document.addEventListener('touchstart', handleTextareaDivOutside);

    return () => {
      document.removeEventListener('mousedown', handleTextareaDivOutside);
      document.removeEventListener('touchstart', handleTextareaDivOutside);
    };
  }, []);

  return (
    <div className={classNames($.textareaContainer)}>
      <div ref={textareaWrapperRef} className={classNames($.textareaWrapper)}>
        <textarea
          className={classNames($.textarea)}
          rows={1}
          ref={textareaRef}
          value={text}
          maxLength={maxLength}
          onChange={onChangeText}
          inputMode={inputMode}
        />
        {isTyping && !showCounter && (
          <div className={classNames($.textareaCloseWrapper)}>
            <X className={classNames($.textareaClose)} onClick={handleClear} />
          </div>
        )}
      </div>
      {showCounter && (
        <div className={classNames($.counterWrapper)}>
          <Body3>
            {text.length}/{maxLength}
          </Body3>
        </div>
      )}
    </div>
  );
}