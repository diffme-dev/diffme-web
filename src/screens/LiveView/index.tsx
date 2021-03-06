import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
    ClockIcon,
    HomeIcon,
    MenuAlt1Icon,
    ViewListIcon,
    XIcon,
} from "@heroicons/react/outline";
import {
    ChevronRightIcon,
    DotsVerticalIcon,
    DuplicateIcon,
    PencilAltIcon,
    SearchIcon,
    SelectorIcon,
    TrashIcon,
    UserAddIcon,
} from "@heroicons/react/solid";
import Changes from "./Changes";
import Header from "./Header";

export default function Home() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div>
            <Header />
            <Changes />
        </div>
    );
}
