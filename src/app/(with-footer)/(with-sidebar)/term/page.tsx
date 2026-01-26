import TermHeader from './_components/TermHeader'

export default function Page() {
  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-[#EDF2F6] to-white">
      <TermHeader />
      <div className="w-full mx-auto flex min-w-[630px] max-w-[900px] pt-[30px] px-[20px] pb-[60px] flex-col items-center gap-[30px]">
        <div className="w-full typo-h2 text-fg-basic-accent">{'딱!(ttak!) 서비스 이용 약관'}</div>
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="typo-b1 text-fg-basic-accent">{'제1조 (목적)'}</div>
          <div className="typo-b2 text-fg-basic-primary">
            {
              "본 약관은 ‘딱!(ttak)’(이하 '서비스')이 제공하는 건강기능식품 정보 제공 서비스의 이용과 관련하여 서비스와 이용자 간의 권리·의무 및 책임사항, 이용 조건과 절차 등 기본적인 사항을 규정함을 목적으로 합니다."
            }
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="typo-b1 text-fg-basic-accent">{'제2조 (서비스의 성격 및 한계)'}</div>
          <div className="flex flex-col">
            <div className="flex items-start gap-[6px]">
              <div className="shrink-0 typo-b2 text-fg-basic-primary pl-[6px]">1.</div>
              <div className="typo-b2 text-fg-basic-primary">
                본 서비스는{' '}
                <strong className="font-semibold">
                  건강기능식품 구매 전 이해를 돕기 위한 정보 제공 서비스
                </strong>
                로서 제품의 판매, 광고, 추천 또는 구매 유도를 목적으로 하지 않습니다.
              </div>
            </div>
            <div className="flex items-start gap-[6px]">
              <div className="shrink-0 typo-b2 text-fg-basic-primary pl-[6px]">2.</div>

              <div className="flex flex-col typo-b2 text-fg-basic-primary">
                <div>서비스에서 제공하는 정보는 다음 자료를 근거로 합니다.</div>

                <ul className="list-disc pl-[22px] space-y-1">
                  <li>식품의약품안전처 등 공공기관이 제공하는 공개 데이터</li>
                  <li>제품에 표시된 공식 표기 정보</li>
                </ul>
              </div>
            </div>
            <div className="flex items-start gap-[6px]">
              <div className="shrink-0 typo-b2 text-fg-basic-primary pl-[6px]">3.</div>
              <div className="typo-b2 text-fg-basic-primary">
                본 서비스는 의료행위, 진단, 치료 또는 처방을 제공하지 않으며, “섭취해도 된다/안
                된다”, “효과가 있다”와 같은 판단·단정적 표현을 사용하지 않습니다.
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="typo-b1 text-fg-basic-accent">{'제3조 (정보 이용에 대한 유의사항)'}</div>
          <div className="flex flex-col">
            <div className="flex items-start gap-[6px]">
              <div className="shrink-0 typo-b2 text-fg-basic-primary pl-[6px]">1.</div>
              <div className="typo-b2 text-fg-basic-primary">
                서비스에서 제공되는 모든 정보는{' '}
                <strong className="font-semibold">‘일반적인 참고용’</strong>
                이며, 개인의 건강 상태, 체질, 질환, 복용 중인 약물 등에 따른 의료적 판단을 대체할 수
                없습니다.
              </div>
            </div>
            <div className="flex items-start gap-[6px]">
              <div className="shrink-0 typo-b2 text-fg-basic-primary pl-[6px]">2.</div>
              <div className="typo-b2 text-fg-basic-primary">
                임산부, 청소년, 다이어터 등 특정 대상과 관련된 정보는 공공 데이터 내 주의 문구를
                기준으로 한 정보 강조 또는 노출 방식일 뿐, 개인에게 적합함을 보장하거나 섭취 가능
                여부를 결정하지 않습니다.
              </div>
            </div>
            <div className="flex items-start gap-[6px]">
              <div className="shrink-0 typo-b2 text-fg-basic-primary pl-[6px]">3.</div>
              <div className="typo-b2 text-fg-basic-primary">
                이용자는 건강기능식품 섭취 여부에 대해{' '}
                <strong className="font-semibold">
                  반드시 전문가와 상담한 후 본인의 책임 하에 최종 판단
                </strong>
                해야 합니다.
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="typo-b1 text-fg-basic-accent">{'제4조 (이용 형태 및 계정)'}</div>
          <div className="flex flex-col">
            <div className="flex items-start gap-[6px]">
              <div className="shrink-0 typo-b2 text-fg-basic-primary pl-[6px]">1.</div>
              <div className="typo-b2 text-fg-basic-primary">
                본 서비스는 회원가입 없이 게스트 상태로 주요 기능 이용이 가능합니다.
              </div>
            </div>
            <div className="flex items-start gap-[6px]">
              <div className="shrink-0 typo-b2 text-fg-basic-primary pl-[6px]">2.</div>
              <div className="typo-b2 text-fg-basic-primary">
                일부 개인화 기능(최근 기록 등)은 Google 소셜 로그인을 통해 로그인한 사용자에게만
                제공됩니다.
              </div>
            </div>
            <div className="flex items-start gap-[6px]">
              <div className="shrink-0 typo-b2 text-fg-basic-primary pl-[6px]">3.</div>
              <div className="typo-b2 text-fg-basic-primary">
                서비스는 이메일 기반 회원가입을 제공하지 않으며, Google OAuth 기반 인증을 단일
                로그인 수단으로 사용합니다.
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="typo-b1 text-fg-basic-accent">{'제5조 (이용자의 의무)'}</div>
          <div className="flex flex-col">
            <div className="typo-b2 text-fg-basic-primary">
              이용자는 다음 각 호의 행위를 하여서는 안 됩니다.
            </div>
            <div className="flex items-start gap-[6px]">
              <div className="shrink-0 typo-b2 text-fg-basic-primary pl-[26px]">1.</div>
              <div className="typo-b2 text-fg-basic-primary">
                서비스를 정보 제공 목적 외의 용도로 이용하는 행위
              </div>
            </div>
            <div className="flex items-start gap-[6px]">
              <div className="shrink-0 typo-b2 text-fg-basic-primary pl-[26px]">2.</div>
              <div className="typo-b2 text-fg-basic-primary">
                서비스의 중립성·신뢰성을 훼손하는 행위
              </div>
            </div>
            <div className="flex items-start gap-[6px]">
              <div className="shrink-0 typo-b2 text-fg-basic-primary pl-[26px]">3.</div>
              <div className="typo-b2 text-fg-basic-primary">
                서비스의 정상적인 운영을 방해하거나 시스템에 부당한 영향을 주는 행위
              </div>
            </div>
            <div className="flex items-start gap-[6px]">
              <div className="shrink-0 typo-b2 text-fg-basic-primary pl-[26px]">4.</div>
              <div className="typo-b2 text-fg-basic-primary">
                서비스가 제공하지 않는 판단·결론을 서비스가 제공한 것처럼 오인·왜곡하는 행위
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="typo-b1 text-fg-basic-accent">{'제6조 (서비스 제공의 한계)'}</div>
          <div className="flex flex-col">
            <div className="flex items-start gap-[6px]">
              <div className="shrink-0 typo-b2 text-fg-basic-primary pl-[6px]">1.</div>
              <div className="typo-b2 text-fg-basic-primary">
                서비스는 공신력 있는 데이터에 기반하여 정보를 제공하나, 원본 데이터의 비정형성, 해석
                기준의 차이, 업데이트 시점 차이로 인해 일부 정보가 실제 제품 정보와 상이할 수
                있습니다.
              </div>
            </div>
            <div className="flex items-start gap-[6px]">
              <div className="shrink-0 typo-b2 text-fg-basic-primary pl-[6px]">2.</div>
              <div className="typo-b2 text-fg-basic-primary">
                서비스는 데이터 오류 또는 불완전성을 인지한 경우 개선을 위해 노력하나, 즉각적인 수정
                또는 완전성을 보장하지는 않습니다.
              </div>
            </div>
            <div className="flex items-start gap-[6px]">
              <div className="shrink-0 typo-b2 text-fg-basic-primary pl-[6px]">3.</div>
              <div className="typo-b2 text-fg-basic-primary">
                시스템 점검, 공공 데이터 서버(API) 장애, 기술적 사유로 서비스 이용이 일시적으로
                중단될 수 있습니다.
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="typo-b1 text-fg-basic-accent">{'제7조 (면책 사항)'}</div>
          <div className="flex flex-col">
            <div className="flex items-start gap-[6px]">
              <div className="shrink-0 typo-b2 text-fg-basic-primary pl-[6px]">1.</div>
              <div className="typo-b2 text-fg-basic-primary">
                서비스는 특정 제품의 효능, 효과, 안전성 또는 적합성을 보증하지 않습니다.
              </div>
            </div>
            <div className="flex items-start gap-[6px]">
              <div className="shrink-0 typo-b2 text-fg-basic-primary pl-[6px]">2.</div>
              <div className="typo-b2 text-fg-basic-primary">
                이용자가 서비스 정보를 신뢰하여 내린 판단 또는 그 결과에 대해 서비스는 법적 책임을
                지지 않습니다.
              </div>
            </div>
            <div className="flex items-start gap-[6px]">
              <div className="shrink-0 typo-b2 text-fg-basic-primary pl-[6px]">3.</div>
              <div className="typo-b2 text-fg-basic-primary">
                이용자가 제품명을 잘못 입력하거나, 공공 데이터에 존재하지 않는 제품을 조회하여
                발생한 결과에 대해서 서비스는 책임을 지지 않습니다.
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="typo-b1 text-fg-basic-accent">{'제8조 (분쟁해결 및 관할법원)'}</div>
          <div className="typo-b2 text-fg-basic-primary">
            서비스 이용으로 발생한 분쟁에 대해 소송이 제기될 경우, 서비스 운영사의 소재지를 관할하는
            법원을 관할법원으로 합니다.
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="typo-b1 text-fg-basic-accent">{'부칙'}</div>
          <div className="typo-b2 text-fg-basic-primary">
            본 약관은 <strong className="font-semibold">2026년 1월 28일부터 시행</strong>됩니다.
          </div>
        </div>
      </div>
    </div>
  )
}
