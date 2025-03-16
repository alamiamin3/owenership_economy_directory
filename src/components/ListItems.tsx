import airTableApi, {  ORGANIZATION_TABLE  } from "@/utils/axiosInstance"
import { ContactInformation, fieldsInterface, FundingFinancialInformation, HeadquartersLocation, LinksSocialMedia, Organization, TokenInformation } from "@/utils/interfaces"
import { useContext, useEffect, useState } from "react"
import OrganizationCard from "./OrganizationCard"
import { useSearchParams } from "react-router-dom"
import { Button } from "./ui/button"
import {AppContext} from "./Context/AppContext"
import NoDataFound from "./NoDataFound"

function getLocationObject(fields: fieldsInterface){

    const {city, address, state_region, country, ...otherFields} = fields
    const locationObj : HeadquartersLocation = {}
    if(city)
        locationObj.city = city[0]
    if (address)
        locationObj.address = address[0]
    if (state_region)
        locationObj.state_region = state_region[0]
    if (country)
        locationObj.country = country[0]
    otherFields.headquarters_location = locationObj
    return otherFields
}
function getTokenObject(fields: fieldsInterface){

  const {token_name, token_symbol, token_platform, token_governance_mechanism,token_link, ...otherFields} = fields
  const tokenObj : TokenInformation = {}
  if(token_name)
      tokenObj.token_name = token_name[0]
  if (token_symbol)
      tokenObj.token_symbol = token_symbol[0]
  if (token_platform)
      tokenObj.token_platform = token_platform[0]
  if (token_governance_mechanism)
      tokenObj.token_governance_mechanism = token_governance_mechanism[0]
  if (token_link)
    tokenObj.token_link = token_link[0]
  otherFields.token_information = tokenObj
  return otherFields
}
function getLinkObject(fields: fieldsInterface){

  const {website, twitter, linkedin, discord,github,other_links, ...otherFields} = fields
  const linkObj : LinksSocialMedia = {}
  if(website && website !== null)
      linkObj.website = website[0]
  if (twitter && twitter!== null)
      linkObj.twitter = twitter[0]
  if (discord && discord !== null)
      linkObj.discord = discord[0]
  if (github && github !== null)
      linkObj.github = github[0]
  if (other_links && other_links !== null)
    linkObj.other_links = other_links[0]
  otherFields.links_social_media = linkObj
  return otherFields
}
function getFundingObject(fields: fieldsInterface){

    const {funding_sources, revenue, ...otherFields} = fields
    const fundingObj : FundingFinancialInformation = {}
    if(funding_sources){
        fundingObj.funding_sources = funding_sources
    }
    if (revenue)
        fundingObj.revenue = revenue[0]
    otherFields.funding_financial_information = fundingObj
    return otherFields

}
function getContactObj(fields: fieldsInterface){

  const {contact_person, phone,email, ...otherFields} = fields
  const contactObj : ContactInformation = {}
  if(contact_person)
      contactObj.contact_person = contact_person[0]
  if (phone)
      contactObj.phone = phone[0]
  if (email)
    contactObj.email = email[0]
  otherFields.contact_info = contactObj
  return otherFields

}
function getNestedObject(record: Organization){
    if (record.fields.headquarters_location)
        record.fields = getLocationObject(record.fields)
    if (record.fields.funding_financial_information)
        record.fields = getFundingObject(record.fields)
    if (record.fields.token_information)
        record.fields = getTokenObject(record.fields)
    if (record.fields.links_social_media)
        record.fields = getLinkObject(record.fields)
    if (record.fields.contact_info)
        record.fields = getContactObj(record.fields)

}
export default function ListItems() {
    const AppContextConsumer = useContext(AppContext)
    if (!AppContextConsumer)
        throw new Error("invalid scope")
    const {setOrganizationType,setOwnershipStructure, setGeographicScope, setGovernanceModel, setIndustry, setFormula, setSearch} = AppContextConsumer
    const [loading, setLoading] = useState<boolean>(true)
    const [offset, setOffset] = useState<string| undefined>(undefined)
    const [pending, setPending] = useState<boolean>(false)
    const [searchParam] = useSearchParams()
    interface paramsInterface {
      pageSize: string,
      filterByFormula?: string,
      offset?: string
    }
    const fetchOrganizations = async ()=>{
        try{
            const formula = searchParam.get('filter')
            const myParam: paramsInterface = {
              pageSize:"10",
            }
            if (formula)
              myParam.filterByFormula=formula
            if (offset)
              myParam.offset=offset
            const req = {
                method: 'GET',
                url: ORGANIZATION_TABLE,
                params:myParam
            }
            const resp = await airTableApi(req)
            const resp_data = resp.data.records as Organization[]
            
            resp_data.forEach(element => {
              getNestedObject(element)
                
            });
            if (pending){
              setOrganizations(prev=>[...prev, ...resp_data])
              setPending(false)
            }
            else
              setOrganizations(resp_data)
            if (resp.data.offset)
              setOffset(resp.data.offset)
            else if (offset)
              setOffset(undefined)
            setLoading(false)
        }
        catch(err){
            console.error(err)
        }
    }
    const resetSearch = ()=>{
      setFormula({})
      setOrganizationType(undefined)
      setOwnershipStructure(undefined)
      setSearch('')
      setGeographicScope(undefined)
      setGovernanceModel(undefined)
      setIndustry(undefined)
    }
    useEffect(()=>{
        resetSearch()
        fetchOrganizations()
    },[])
    useEffect(()=>{
      if(pending)
        fetchOrganizations()
    },[pending])
    const handleLoadMore = ()=>{
      if (!pending)
        setPending(true)
    }
    const [organizations, setOrganizations] = useState<Organization[]>([])
    
      return (
        
          loading ? <div className="animate-spin rounded-full h-16 w-16 border-t-2  border-primary"></div> 
          :<div className="p-8 container flex flex-col  gap-4 min-h-screen justify-center ">
          {
            organizations.length? organizations.map((item,index)=>(
              <OrganizationCard organization={item} key={index}/>
            )) : <NoDataFound/>
          }
            <div className={`${offset ? 'block' : 'hidden'} self-center `}>
              {
                pending
                ? <div className="animate-spin rounded-full h-16 w-16 border-t-2  border-primary"></div> 
                : <Button onClick={handleLoadMore}>Load More</Button>
              }
               
            </div>
          </div>
        
      );
  
}
