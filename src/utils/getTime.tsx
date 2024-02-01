export default function getTime(postCreatedAt: string) {
  let newTimeText = '';

  if (postCreatedAt && postCreatedAt.includes('오후')) {
    newTimeText = postCreatedAt.replace('오후 ', '') + ' PM';
  } else if (postCreatedAt && postCreatedAt.includes('오전')) {
    newTimeText = postCreatedAt.replace('오후 ', '') + ' AM';
  }
  const now = Date.now();
  const createdTime = new Date(newTimeText).getTime();

  const min = 60;
  const hour = min * 60;
  const day = hour * 24;
  const timeGap = Math.trunc((now - createdTime) / 1000);

  let timeGapText = newTimeText.slice(0, 13).replaceAll(' ', '');
  if (timeGap < min) {
    timeGapText = '방금 전';
  } else if (timeGap < hour) {
    timeGapText = Math.trunc(timeGap / min) + '분 전';
  } else if (timeGap < day) {
    timeGapText = Math.trunc(timeGap / hour) + '시간 전';
  } else if (timeGap < day * 7) {
    timeGapText = Math.trunc(timeGap / day) + '일 전';
  }

  return timeGapText;
}
