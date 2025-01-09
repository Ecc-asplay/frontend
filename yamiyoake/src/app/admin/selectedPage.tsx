import AdminUsers from './adminusers'; 

const SelectedPage:  Record<string, JSX.Element> ={
    adminUsers:(
        <AdminUsers/>        
    ),
    report:(
        <div>report</div>
    ),
    comment:(
        <div>comment</div>
    ),
    contact:(
        <div>contact</div>
    ),
    setting:(
        <div>setting</div>
    ),
    logout:(
        <div>logout</div>
    ),
} 
export default SelectedPage;