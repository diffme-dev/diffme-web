import { diffme } from "../../api";
import { useQuery } from "react-query";
import moment from "moment-timezone";
import { Link } from "react-router-dom";

// Access the key, status and page variables in your query function!
function getChanges({ queryKey }) {
    const [_key] = queryKey;
    return diffme.changes.list({
        limit: 50,
    });
}

const ChangeList = () => {
    const { data, isLoading } = useQuery(["changes", {}], getChanges, {
        enabled: true,
    });

    const changes = data?.isSuccess() ? data.value.changes : [];

    return (
        <nav className="flex-1 min-h-0 overflow-y-auto" aria-label="Directory">
            <ul className="relative z-0 divide-y divide-gray-200">
                {changes.map((change) => (
                    <li key={change.id}>
                        <Link
                            to={`/references/${change.reference_id}`}
                            className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
                        >
                            <div className="flex-1 min-w-0">
                                <div className="focus:outline-none">
                                    {/* Extend touch target to entire panel */}
                                    <span
                                        className="absolute inset-0"
                                        aria-hidden="true"
                                    />
                                    <p className="text-sm font-medium text-gray-900">
                                        {change.reference_id}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">
                                        Edited by {change.editor}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 truncate">
                                    {moment(change.created_at).fromNow(false)}
                                </p>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default ChangeList;
