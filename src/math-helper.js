import { create, all, parse } from 'mathjs'

const config = { }
export const math = create(all, config)

export function magnitude(vec){
    return math.sqrt(vec[0]**2 + vec[1]**2 + vec[2]**2)
}

export function distance(vec1, vec2){
    return math.sqrt((vec1[0]-vec2[0])**2 + (vec1[1]-vec2[1])**2 + (vec1[2]-vec2[2])**2)
}
