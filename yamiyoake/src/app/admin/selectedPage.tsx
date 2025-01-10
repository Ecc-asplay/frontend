import AdminUsers from './adminusers'; 
import Report from './report';
import Comments from './comments';
import Contact from './contact';
import View from './view';
const SelectedPage:  Record<string, JSX.Element> ={
    adminUsers:(
        <AdminUsers />        
    ),
    report:(
        <Report />
    ),
    comment:(
        <Comments />
    ),
    contact:(
        <Contact />
    ),
    view:(
        <View />
    ),
    feature:(
        <div>feature</div>
    ),
    logout:(
        <div>logout</div>
    ),
} 
export default SelectedPage;