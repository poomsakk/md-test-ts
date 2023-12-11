function getClockAngle(hh_mm: string): number {
  const temp = hh_mm.split(":");
  let hh: number = +temp[0];
  let nn: number = +temp[1];
  if (hh >= 12) hh -= 12;

  const minuteAngle: number = nn * 6;
  const hourAngle: number = hh * 30 + nn / 2;
  
  let angle = Math.abs(minuteAngle - hourAngle);
  if (angle > 180) angle = 360 - angle;
  return angle;
}