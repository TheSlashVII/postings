// file used to define the types that we will use in the project

// job experience

export type JobExperience = {
  position: string,
  company_name: string,
  start_date: string | Date,
  end_date?: string | Date,
  description?: string
}

export type OnboardingPersonalDetails = {
  name: string,
  surname: string,
  date_of_birth: string | Date,
  city_of_residence: string,
  country: string,
  phone: string
}

export type JobPost = {
  title: string,
  company_name: string,
  experience_required: number,
  description: string,
  sector?: string
}

export type ApplicantProfile = {
  name: string,
  surname: string,
  date_of_birth: string | Date,
  city_of_residence: string,
  country: string,
  email: string,
  phone: string,
  experience: JobExperience[] | null
}
