"use client";
import React from 'react'
import ProductCard from './(customers)/ProductCard'
import withAuth from './withAuth';
import Head from 'next/head';

function Homepage() {
  return (
    <><div>
        <h1>Home</h1>
      </div></>
  )
}

export default withAuth(Homepage);