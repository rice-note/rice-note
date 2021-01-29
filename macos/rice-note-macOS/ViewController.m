#import "ViewController.h"
#import "AppDelegate.h"

#import <React/RCTRootView.h>
@import AppCenter;
@import AppCenterCrashes;

@implementation ViewController

- (void)viewDidLoad {
  [super viewDidLoad];

  RCTBridge *bridge = [((AppDelegate *)[NSApp delegate])bridge];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge moduleName:@"rice-note" initialProperties:nil];

  NSView *view = [self view];

  [view addSubview:rootView];
  [rootView setBackgroundColor:[NSColor windowBackgroundColor]];
  [rootView setFrame:[view bounds]];
  [rootView setAutoresizingMask:(NSViewMinXMargin | NSViewMinXMargin | NSViewMinYMargin | NSViewMaxYMargin | NSViewWidthSizable | NSViewHeightSizable)];
  
  [MSACAppCenter start:@"4a31d0f3-974c-43d3-85b6-7385886a78fa" withServices:@[
    [MSACCrashes class]
  ]];
}

@end
