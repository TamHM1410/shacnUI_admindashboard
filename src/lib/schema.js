
import { z } from "zod"
import { PHONE_NUMBER_MAX_LENGTH, PHONE_NUMBER_MIN_LENGTH, PHONE_NUMBER_PATTERN } from "./rule"

export const loginSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(3)
})

export const serviceSchema = z.object({
    serviceName: z.string().min(1),
    price: z.string().min(1),
    duration: z.string().min(1),
    type: z.string().min(1),
    description: z.string().optional()
})

export const blogSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1)
})

export const userSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(3),
    email: z.string().email()
})

export const postSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    description: z.string().optional()
})

export const workScheduleSchema = z.object({
    expertId: z.string(),
    work_date: z.date(),
    start_at: z.date(),
    end_at: z.date()
})

export const expertSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(3),
    fullName: z.string(),
    email: z.string().email(),
    phone: z.string()
    .min(PHONE_NUMBER_MIN_LENGTH, `Phone number must be at least ${PHONE_NUMBER_MIN_LENGTH} digits`)
    .max(PHONE_NUMBER_MAX_LENGTH, `Phone number must be at most ${PHONE_NUMBER_MAX_LENGTH} digits`)
    .regex(PHONE_NUMBER_PATTERN, "Phone number must contain only digits and be 9 to 11 characters long"),
    specialization: z.string(),
    yearOfExperiences: z.string(),
    description: z.string().optional(),
    imageBase64: z.string()
})