type SpacerProps = { width: number; height?: never } | { width?: never; height: number };

/**
 * 지정된 너비 또는 높이를 가진 고정된 공간을 추가하는 Spacer 컴포넌트입니다
 * `width`와 `height` 중 하나만 전달할 수 있습니다.
 * 전달된 `width` 또는 `height` 값은 rem 단위로 변환됩니다.
 *
 * @param {number} [props.width] - Spacer의 너비 (rem 단위).
 * @param {number} [props.height] - Spacer의 높이 (rem 단위).
 *
 * @returns {JSX.Element} Spacer 요소를 반환합니다.
 */
const Spacer = ({ width, height }: SpacerProps) => {
  return (
    <div
      css={{
        ...(width && { width: `${width}rem` }),
        ...(height && { height: `${height}rem` }),
      }}
    />
  );
};

export default Spacer;
