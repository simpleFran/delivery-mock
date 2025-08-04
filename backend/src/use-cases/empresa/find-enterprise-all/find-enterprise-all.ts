import { EnterprisesRepository } from "@/domain/repositories/enterprises-repository";
import {Empresa } from "@/domain/entities/Empresa"; 


export class FindEnterpriseAll{

    constructor(private enterprisesRepository: EnterprisesRepository){}

        
    async execute(): Promise<Empresa[]>{

        const getAll = await this.enterprisesRepository.findAll();
        return getAll
    }
}