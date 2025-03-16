import { industries } from '@/utils/constants'
import  { createContext, ReactNode, useEffect, useState } from 'react'

interface formulaInterface{
    organizationTypeFilter?: string,
    ownershipStructureFilter?: string,
    industryFilter? : string, 
    geographicScopeFilter?: string,
    governanceModelFilter?: string,
    searchFilter?: string
}
interface AppContextInterface{
    organizationType: string | undefined,
    setOrganizationType: React.Dispatch<React.SetStateAction<string | undefined> >,
    ownershipStructure: string | undefined,
    setOwnershipStructure: React.Dispatch<React.SetStateAction<string | undefined> >,
    industry: string | undefined,
    setIndustry: React.Dispatch<React.SetStateAction<string | undefined> >,
    geographicScope: string | undefined,
    setGeographicScope: React.Dispatch<React.SetStateAction<string | undefined> >,
    governanceModel: string | undefined,
    setGovernanceModel: React.Dispatch<React.SetStateAction<string | undefined> >,
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string> >,
    formula: formulaInterface,
    setFormula: React.Dispatch<React.SetStateAction<formulaInterface> >,


}
export const AppContext = createContext<AppContextInterface | undefined>(undefined)
const AppContextProvider : React.FC<{children : ReactNode}> = ({children}) =>{
    
    const [organizationType, setOrganizationType] = useState<string|undefined>(undefined)
    const [ownershipStructure, setOwnershipStructure] = useState<string|undefined>(undefined)
    const [industry, setIndustry] = useState<string|undefined>(undefined)
    const [geographicScope, setGeographicScope] = useState<string|undefined>(undefined)
    const [governanceModel, setGovernanceModel] = useState<string|undefined>(undefined)
    const [search, setSearch] = useState<string>('')
    const [formula, setFormula] = useState<formulaInterface>({})
    const addFormula = (filter: string)=>{
        switch(filter){
            case "organizationType":
                setFormula((prev)=>({...prev, organizationTypeFilter: `{organization_type}='${organizationType}'`}))
                break
            case "ownershipStructure":
                setFormula((prev)=>({...prev, ownershipStructureFilter: `{ownership_structure}='${ownershipStructure}'`}))
                break
            case "geographicScope":
                setFormula((prev)=>({...prev, geographicScopeFilter: `{geographical_scope}='${geographicScope}'`}))
                break
            case "governanceModel":
                setFormula((prev)=>({...prev, governanceModelFilter: `{governance_model}='${governanceModel}'`}))
                break
            case "search":
                setFormula((prev)=>({...prev, searchFilter: `FIND('${search.toLowerCase()}', LOWER({name})) > 0`}))
                break
            case "industry":
                if (industry ){
                    Object.entries(industries).forEach(([key, value])=>{
                        if (key === industry)
                            setFormula((prev)=>({...prev, industryFilter: `LEFT({industry}, 2) >= '${value[0]}', LEFT({industry}, 2) <= '${value[1]}'`}))
                    })
                }
                break
            default:
                break

        }
    }
    useEffect(()=>{
        if (organizationType)
            addFormula("organizationType")
        if (ownershipStructure)
            addFormula("ownershipStructure")
        if (geographicScope)
            addFormula("geographicScope")
        if (governanceModel)
            addFormula("governanceModel")
        if (search)
            addFormula("search")
        if (industry)
            addFormula("industry")

    },[organizationType, ownershipStructure, industry, geographicScope, governanceModel, search])

    return (
        <AppContext.Provider value={{organizationType, setOrganizationType, ownershipStructure, setOwnershipStructure, industry, setIndustry, geographicScope, setGeographicScope, governanceModel, setGovernanceModel, search, setSearch, formula, setFormula}}>
            {children }
        </AppContext.Provider>
    )
}
export default AppContextProvider
