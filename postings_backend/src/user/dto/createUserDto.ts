// data structure for the request of saving the new data a user

export type JobExperience = {
  position: string,
  company_name: string,
  start_date: string,
  end_date?: string,
  description?: string
}
export type PersonalDetails = {
  name: string,
  surname: string,
  date_of_birth: string | Date,
  city_of_residence: string,
  country: string,
  phone: string
}
export class SaveOnboardingDto {
  jobExperience: JobExperience[]
  personalDetails: PersonalDetails
}

