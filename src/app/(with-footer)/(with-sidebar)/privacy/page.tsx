import PrivacyHeader from './_components/PrivacyHeader'

export default function Page() {
  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-[#EDF2F6] to-white relative">
      <PrivacyHeader />
      <div className="w-full mx-auto flex min-w-[630px] max-w-[900px] pt-[30px] px-[20px] pb-[60px] flex-col items-center gap-[30px]">
        <div className="w-full typo-h2 text-fg-basic-accent">{'딱!(ttak!) 개인정보 처리 방침'}</div>
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="flex items-start gap-[6px]">
            <div className="shrink-0 typo-b1 text-fg-basic-accent">1.</div>
            <div className="typo-b1 text-fg-basic-accent">개인정보의 처리 목적</div>
          </div>
          <div className="flex flex-col typo-b2 text-fg-basic-primary">
            <div>
              {
                "딱!(TTAK!)’(이하 '서비스')는 회원가입 없이 게스트 이용이 가능한 정보 제공 서비스를 기본으로 하며, 서비스 제공에 필수적인 경우를 제외하고 개인정보를 수집하지 않습니다. 다만, 서비스 이용 과정에서 다음과 같은 정보가 자동으로 생성·수집될 수 있습니다."
              }
            </div>

            <ul className="list-disc pl-[22px] space-y-1">
              <li>수집 항목: 접속 로그, 접속 IP 정보, 쿠키(Cookie), 서비스 이용 기록</li>
              <li>
                수집 목적: 서비스 접속 현황 분석 및 품질 개선, 비정상적 접근 및 부정 이용 방지, 보안
                및 안정적인 서비스 운영
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="flex items-start gap-[6px]">
            <div className="shrink-0 typo-b1 text-fg-basic-accent">2.</div>
            <div className="typo-b1 text-fg-basic-accent">로그인 이용 시 수집하는 개인정보</div>
          </div>
          <div className="flex flex-col typo-b2 text-fg-basic-primary">
            <div>
              서비스는 이메일 기반 회원가입을 제공하지 않으며, Google 소셜 로그인(OAuth)을 단일 인증
              수단으로 사용합니다. 로그인 이용 시 다음과 같은 정보가 수집될 수 있습니다.
            </div>

            <ul className="list-disc pl-[22px] space-y-1">
              <li>필수 수집 항목: 이메일 주소, 이름, 프로필 이미지 (사용자 식별 목적)</li>
              <li>선택 수집 항목: 관심 카테고리, 사용자 유형 선택</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="flex items-start gap-[6px]">
            <div className="shrink-0 typo-b1 text-fg-basic-accent">3.</div>
            <div className="typo-b1 text-fg-basic-accent">추가 정보 수집(선택)</div>
          </div>
          <div className="flex flex-col typo-b2 text-fg-basic-primary">
            <div>
              로그인 이후, 서비스는 정보 제공의 맥락 정확도를 높이기 위해 다음과 같은 선택 정보를
              요청할 수 있습니다.
            </div>

            <ul className="list-disc pl-[22px] space-y-2">
              <li>
                관심 카테고리
                <ul className="list-disc pl-6 mt-1 space-y-1">
                  <li>
                    눈 건강 / 뼈·관절 / 면역 / 피로·에너지 / 수면·스트레스 / 장 건강 / 혈행·혈압 /
                    피부·모발 / 근육·운동 / 간 건강
                  </li>
                </ul>
              </li>

              <li>
                사용자 유형 선택
                <ul className="list-disc pl-6 mt-1 space-y-1">
                  <li>일반 / 임산부 / 청소년 / 다이어터 등</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="flex items-start gap-[6px]">
            <div className="shrink-0 typo-b1 text-fg-basic-accent">4.</div>
            <div className="typo-b1 text-fg-basic-accent">개인정보의 보유 및 이용 기간</div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-start gap-[6px]">
              <div className="shrink-0 typo-b2 text-fg-basic-primary pl-[6px]">1.</div>
              <div className="typo-b2 text-fg-basic-primary">
                서비스는 원칙적으로 개인정보를 장기간 보유하지 않습니다.
              </div>
            </div>
            <div className="flex items-start gap-[6px]">
              <div className="shrink-0 typo-b2 text-fg-basic-primary pl-[6px]">2.</div>

              <div className="flex flex-col typo-b2 text-fg-basic-primary">
                <div>다만, 관련 법령에 따라 다음과 같이 최소한의 정보를 보관할 수 있습니다.</div>

                <ul className="list-disc pl-[22px] space-y-1">
                  <li>접속 기록 등 로그 정보 → 통신비밀보호법 등 관계 법령에서 정한 기간</li>
                </ul>
              </div>
            </div>
            <div className="flex items-start gap-[6px]">
              <div className="shrink-0 typo-b2 text-fg-basic-primary pl-[6px]">3.</div>
              <div className="typo-b2 text-fg-basic-primary">
                보유 기간이 경과한 개인정보는 지체 없이 파기됩니다.
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="flex items-start gap-[6px]">
            <div className="shrink-0 typo-b1 text-fg-basic-accent">5.</div>
            <div className="typo-b1 text-fg-basic-accent">개인정보의 제3자 제공</div>
          </div>
          <div className="flex flex-col typo-b2 text-fg-basic-primary">
            <div>
              서비스는 이용자의 개인정보를 외부 마케팅, 광고 또는 상업적 목적으로 제3자에게 제공하지
              않습니다.
            </div>
            <div>다만, 다음의 경우는 예외로 합니다.</div>

            <ul className="list-disc pl-[22px] space-y-1">
              <li>법령에 근거한 수사기관의 정당한 요청이 있는 경우</li>
              <li>법원의 명령, 관계 법령에 따른 제출 의무가 발생한 경우</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="flex items-start gap-[6px]">
            <div className="shrink-0 typo-b1 text-fg-basic-accent">6.</div>
            <div className="typo-b1 text-fg-basic-accent">개인정보 처리의 위탁</div>
          </div>
          <div className="flex flex-col typo-b2 text-fg-basic-primary">
            <div>서비스는 현재 개인정보 처리 업무를 외부에 위탁하고 있지 않습니다.</div>
            <div>향후 위탁이 발생할 경우, 관련 사항을 본 방침을 통해 사전에 고지하겠습니다.</div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="flex items-start gap-[6px]">
            <div className="shrink-0 typo-b1 text-fg-basic-accent">7.</div>
            <div className="typo-b1 text-fg-basic-accent">정보주체의 권리 및 행사 방법</div>
          </div>
          <div className="flex flex-col typo-b2 text-fg-basic-primary">
            <div>이용자는 다음과 같은 권리를 행사할 수 있습니다.</div>

            <ul className="list-disc pl-[22px] space-y-1">
              <li>웹브라우저 설정을 통해 쿠키 저장 거부 또는 삭제</li>
              <li>로그인 이용자의 경우, 계정 정보 열람 및 수정</li>
            </ul>
            <div>개인정보 관련 문의는 아래의 개인정보 보호책임자에게 요청할 수 있습니다.</div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="flex items-start gap-[6px]">
            <div className="shrink-0 typo-b1 text-fg-basic-accent">8.</div>
            <div className="typo-b1 text-fg-basic-accent">개인정보의 파기</div>
          </div>
          <div className="flex flex-col typo-b2 text-fg-basic-primary">
            <div>
              개인정보의 수집 및 이용 목적이 달성된 경우, 해당 정보는 복구할 수 없는 기술적 방법을
              사용하여 즉시 파기합니다.
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="flex items-start gap-[6px]">
            <div className="shrink-0 typo-b1 text-fg-basic-accent">9.</div>
            <div className="typo-b1 text-fg-basic-accent">개인정보 보호책임자</div>
          </div>
          <div className="flex flex-col typo-b2 text-fg-basic-primary">
            <ul className="list-disc pl-[22px] space-y-1">
              <li>성명/닉네임: 메들리 @Medly</li>
              <li>문의처: ttak105@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="flex items-start gap-[6px]">
            <div className="shrink-0 typo-b1 text-fg-basic-accent">10.</div>
            <div className="typo-b1 text-fg-basic-accent"> 의료·법적 고지</div>
          </div>
          <div className="flex flex-col typo-b2 text-fg-basic-primary">
            <div>
              본 서비스는 의료 진단, 치료 또는 처방을 제공하지 않으며, 일반적인 정보 제공을 목적으로
              합니다. 제공되는 정보는 식약처 공공 데이터 및 제품 표시사항을 기반으로 하며, 개인의
              상태에 따른 전문적인 의료 판단을 대체할 수 없습니다. 복용 중 이상 증상이 있거나
              우려되는 경우, 반드시 전문가와 상담하시기 바랍니다.
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="flex items-start gap-[6px]">
            <div className="shrink-0 typo-b1 text-fg-basic-accent">11.</div>
            <div className="typo-b1 text-fg-basic-accent">개인정보 처리방침의 변경</div>
          </div>
          <div className="flex flex-col typo-b2 text-fg-basic-primary">
            <div>
              본 방침은 법령, 서비스 정책 변경에 따라 수정될 수 있으며, 중요한 변경 사항이 있을 경우
              서비스 내 공지사항을 통해 사전에 안내합니다.
            </div>

            <ul className="list-disc pl-[22px] space-y-1">
              <li>공고일자: 2026년 1월 12일</li>
              <li>시행일자: 2026년 1월 28일</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
