import eye from '@/assets/eye.png'
import bone from '@/assets/bone.png'
import immunity from '@/assets/immunity.png'
import energy from '@/assets/energy.png'
import sleep from '@/assets/sleep.png'
import intestine from '@/assets/intestine.png'
import blood from '@/assets/blood.png'
import skin from '@/assets/skin.png'
import muscle from '@/assets/muscle.png'
import liver from '@/assets/liver.png'

export const CATEGORY_LIST = [
  { key: 'EYE', label: '눈 건강', image: eye, slug: 'eye' },
  { key: 'BONE', label: '뼈, 관절', image: bone, slug: 'bone' },
  { key: 'IMMUNE', label: '면역', image: immunity, slug: 'immune' },
  { key: 'ENERGY', label: '피로, 에너지', image: energy, slug: 'energy' },
  { key: 'STRESS', label: '수면, 스트레스', image: sleep, slug: 'stress' },
  { key: 'GUT', label: '장 건강', image: intestine, slug: 'gut' },
  { key: 'BLOOD', label: '혈행, 혈압', image: blood, slug: 'blood' },
  { key: 'SKIN', label: '피부, 모발', image: skin, slug: 'skin' },
  { key: 'MUSCLE', label: '근육, 운동', image: muscle, slug: 'muscle' },
  { key: 'LIVER', label: '간 건강', image: liver, slug: 'liver' },
] as const

export const CATEGORY_MAP = {
  eye: 'EYE',
  bone: 'BONE',
  immune: 'IMMUNE',
  energy: 'ENERGY',
  stress: 'STRESS',
  gut: 'GUT',
  blood: 'BLOOD',
  skin: 'SKIN',
  muscle: 'MUSCLE',
  liver: 'LIVER',
} as const

export type Category = (typeof CATEGORY_MAP)[keyof typeof CATEGORY_MAP]
