// file where most of the utilities are saved

import { api } from "./axios"

// define signatures 
export function formatDate(date: string): string;
export function formatDate(date: Date): string;

/*
 * Function used to return the date in this format: DD-MM-YYYY
 * */
export function formatDate(date: Date | string): string {
  if (typeof date === "string") {
    let d = new Date(date)
    return `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`
  }
  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
}

export function formatDateForDatabase(date: string): string;
export function formatDateForDatabase(date: Date): string;

/*
 * Function used to return the date in this format: YYYY-MM-DD
 * Recommended to be used for database operations
 * */
export function formatDateForDatabase(date: Date | string): string {
  if (typeof date === "string") {
    let d = new Date(date)
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
  }
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

export function formatPhoneNumber(number: string) {
  let formatted: string = number.trim().replaceAll(" ", "")
  return formatted;
}

export async function verifySession() {
  return await api.get("/user/account/verify_session")
}

export function logout(navFunction: Promise<void>): void {
  localStorage.removeItem("token")
  navFunction.then()
}

