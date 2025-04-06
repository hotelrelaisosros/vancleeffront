import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { CategoryMiddleware } from "../../src/store/category/categoryMiddleware";
import { Link } from "react-router-dom";

const SidebarMenu = ({isSideBarOpen, toggleSideBar}) => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.category);

    useEffect(() => {
        const formData = { skip: 0, take: 10, };
        dispatch(CategoryMiddleware.GetCategory());
    }, [dispatch]);

    useEffect(() => {
        if (isSideBarOpen === false) {
            document.querySelectorAll('.submenudiv').forEach(submenudiv => {
                submenudiv.style.display = "none";
            });
        }
    }, [isSideBarOpen])

    const showSubMenu = (submenuId) => {
        if (document.getElementById(submenuId).style.display == "block") {
            document.getElementById(submenuId).style.display = "none";
        } else {
            document.querySelectorAll('.submenudiv').forEach(submenudiv => {
                submenudiv.style.display = "none";
            });
            
            document.getElementById(submenuId).style.display = "block";
        }
    }

    return (
        <div className="side-menu" id="sideMenu" style={{ left: ((isSideBarOpen) ? 0 : -420) }}>
            <div className="close-btn closebtnWithClose" id="closeBtn" onClick={toggleSideBar}></div>
            <ul hidden={!isSideBarOpen}>
                <li><a href="/rings">Customize your ring</a></li>
                {
                    (categories) ? categories.map((item, i) => (
                        <li key={i}><a href="#" onClick={() => showSubMenu(`menu${item.id}`)}>{item.name}<i className="fa fa-angle-right" aria-hidden="true"></i></a>
                            {
                                (item.sub_category) ?
                                <div className='level2'>
                                    <div className="side-menu submenudiv" id={`menu${item.id}`}>
                                        <ul className='submenu'>
                                            {
                                                item.sub_category.map((subItem, subi) => (
                                                    <li key={subi}>
                                                        {
                                                            (parseInt(subItem.id) === 2) ? 
                                                                <a href={`/products/ring-two`}>{subItem.name}</a>
                                                            :   
                                                                <a href={`/products/category/${subItem.id}`}>{subItem.name}</a>

                                                        }
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div> : null
                            }
                        </li>
                    )) : null
                }


            </ul>
            <ul className="bottom">
                <li><Link to={'/contact-us'}>Contact us <i className="fa fa-angle-right" aria-hidden="true"></i></Link></li>
                <li><Link to={'/findstore'}>Find a store <i className="fa fa-angle-right" aria-hidden="true"></i></Link></li>
                <li><a href="#">newsletter<i className="fa fa-angle-right" aria-hidden="true"></i></a></li>
                <li><a href="#">france (EUR $) - FR<i className="fa fa-angle-right" aria-hidden="true"></i></a></li>
            </ul>
        </div>
    );
}

export default SidebarMenu