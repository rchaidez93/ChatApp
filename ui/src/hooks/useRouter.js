import { useParams, useLocation, useHistory, useRouteMatch } from "react-router-dom";
import { useMemo } from "react";
import qs from 'qs';

export function useRouter(){
    const params = useParams();
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();
    
    return useMemo(() => {
        return {
            push: history.push,
            replace: history.replace,
            pathname: location.pathname,
            query:{
                ...qs.parse(location.search, {ignoreQueryPrefix: true}),
                ...params
            },
            match,
            location,
            history
        };
    }, [params, match, location, history]);
}