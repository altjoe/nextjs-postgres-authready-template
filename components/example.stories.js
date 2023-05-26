
import React, { useState, useEffect, useRef } from 'react';

function Test(props) {
    return (
        <div className={`border bg-slate-500`}>Test this</div>
    );
}


export default {
    title: "Layouts",
};


const template = (args) =>  <Test  />;


export const test = template.bind({});

test.args = {};

