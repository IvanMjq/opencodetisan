import {PageHeader} from '@/components/ui/page-header'
import {Separator} from '@/components/ui/separator'
import {ManyAssessmentCard} from './component/many-assessment-card'

export default function Assessments() {
  return (
    <>
      <div className='flex justify-between px-32 2xl:px-52 py-12 bg-white'>
        <PageHeader title='Assessments' />
      </div>

      <Separator />
      <div className='px-32 2xl:px-52 pt-6'>
        <ManyAssessmentCard />
      </div>
    </>
  )
}
