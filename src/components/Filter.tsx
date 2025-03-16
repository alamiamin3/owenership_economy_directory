import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import {organizationTypes, ownershipTypes, geographicalScopes, governanceModels, industries} from  '@/utils/constants'
import { IoFilterOutline } from "react-icons/io5";
import FilterSelection, { FilterSelectionProps } from "./FilterSelection";
import { useContext, useState } from "react";
import { AppContext } from "./Context/AppContext";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
export default function Filter() {

    const AppContextConsumer = useContext(AppContext)
    if (!AppContextConsumer)
        throw new Error("invalid scope")
    const {setOrganizationType,setOwnershipStructure, setGeographicScope, setGovernanceModel, setIndustry, setFormula,organizationType, ownershipStructure, geographicScope, governanceModel, industry, formula} =  AppContextConsumer
    const navigate = useNavigate()
    const [error, setError] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const selectionArray : FilterSelectionProps[] = [
        {
            label: 'Organization Type',
            items: organizationTypes,
            onValueChange: setOrganizationType,
            defaultValue: organizationType
        },
        {
            label: 'Ownership structure',
            items: ownershipTypes,
            onValueChange: setOwnershipStructure,
            defaultValue: ownershipStructure
        },
        {
            label: 'Geographic scope',
            items: geographicalScopes,
            onValueChange: setGeographicScope,
            defaultValue: geographicScope
        },
        {
            label: 'Governance model',
            items: governanceModels,
            onValueChange: setGovernanceModel,
            defaultValue: governanceModel
        },
        {
            label: 'Industry',
            items: Object.keys(industries),
            onValueChange: setIndustry,
            defaultValue: industry
        },

  ]
  const handleResetClick = () =>{
        const {searchFilter} = formula
        setOrganizationType(undefined)
        setOwnershipStructure(undefined)
        setGeographicScope(undefined)
        setGovernanceModel(undefined)
        setIndustry(undefined)
        if (searchFilter)
            setFormula({
                searchFilter
            })
        else{
            setFormula({})
        }
        setIsOpen(false)

  }
  const handleRedirect = ()=>{
    const filters = Object.keys(formula).filter(key => key!== 'search')
    if (filters.length){
        setIsOpen(false)
        const query = `AND(${Object.values(formula).join(',')})`
        navigate(`/organizations?filter=${query}`)
    }
    else
        setError(true)
  }

 
  return (
    <Dialog onOpenChange={()=>setIsOpen(!isOpen)} open={isOpen} >
    <DialogTrigger>
       <div className="cursor-pointer">
         <IoFilterOutline size={40}/>
       </div>
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
        <DialogTitle>Filter Companies</DialogTitle>
        <DialogDescription>
            Refine your search results by applying custom filters tailored to your preferences.
        </DialogDescription>
        </DialogHeader>
        {
            selectionArray.map((selection,index)=>{
                return(
                    <FilterSelection key={index} {...selection}/>
                )
            })
        }
        <div className="flex flex-col gap-1">
            <Button className="mt-4" onClick={handleRedirect}>
                Apply Filters
            </Button>
            <p className={`${error? 'visible': 'invisible'} text-red-600 font-light`}>No Filter applied</p>
        </div>
        <Button className="bg-secondary text-primary hover:bg-secondary" onClick={handleResetClick}>
            Reset Filters
        </Button>
    </DialogContent>
    </Dialog>

  )
}
