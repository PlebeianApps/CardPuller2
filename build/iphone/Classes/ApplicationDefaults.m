/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"dozYOc7prEOB8q9ltmbYAtz50vdeiukD"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"PYGuHat9CKS0RMzgbOQwRmPGYsdRWCKW"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"ibX9zRZFXq6TGVtnTvTtrEMQwsteumQX"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"jKfIjUL0gMWGnQb0n49SVoJLtjnuqLwT"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"BNGlBlTy3UWth086Flg4UzSAvjYDR5OV"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"OOior2mknsuDSVvnoGBf8425YG97wjav"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
