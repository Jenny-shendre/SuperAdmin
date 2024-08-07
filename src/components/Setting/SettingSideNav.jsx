const SettingSideNav = () =>{
    return(
        <div style={{height:'771px',width:'206px', borderRight:'1px solid rgba(208, 208, 208, 1)', padding:'24px 24px 0 24px', gap:'17px'}}>

        <div style={{textAlign:'center', width:'122px', height:'101px'}}>

            <button style={{
                width:'122px',
                height:'42px',
                borderRadius:'24px',
                padding:'10px',
                gap:'29px',
                background:'rgba(139,123,114,1)',
                display:'block',
                marginBottom:'17px',
                fontFamily:'Manrope',
                fontWeight:'500',
                fontSize:'16px',
                color:'rgba(255,255,255,1)'
            }}>
                    My Profile
            </button>

            <button
            style={{
                width:'122px',
                height:'42px',
                borderRadius:'24px',
                padding:'10px',
                gap:'29px',
                background:'rgba(139,123,114,1)',
                display:'block'
            }}>
            
                   Password
            </button>

        </div>


        </div>
    )
}

export default SettingSideNav;